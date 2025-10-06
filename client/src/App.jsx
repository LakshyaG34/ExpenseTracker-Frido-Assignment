import React, {useEffect} from "react"
import AddExpense from "./components/expense/addExpense";
import Expense from "./components/expense/expense";
import AddGroup from "./components/group/addGroup";
import Groups from "./components/group/group";
import SearchBar from "./components/searchBar";
import { useAuthContext } from "./context/authContext";
import Login from "./pages/signin";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGroup } from "./redux/groupSlice";

function App() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>;
  }
  const dispatch = useDispatch();

  useEffect(() => {
    const handleGroups = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/groups", {
          credentials: "include"
        });
        if (!response.ok) throw new Error("Error Fetching groups");
        const data = await response.json();
        dispatch(setGroup(data));
      } catch (err) {
        console.log(err);
      }
    };
    handleGroups();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={user ? <Expense /> : <Login />} />
      <Route path="/groups/add" element={user ? <AddGroup /> : <Login />} />
      <Route path="/groups" element={user ? <Groups /> : <Login />} />
      <Route
        path="/expense"
        element={user ? (
            <>
              <SearchBar />
              <Expense />
            </>
          ) : (
            <Login />
          )
        }
        />
      <Route path="/expense/add" element={user?<AddExpense/>:<Login/>}/>
    </Routes>
  );
}

export default App;
