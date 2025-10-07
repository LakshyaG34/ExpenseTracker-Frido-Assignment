import React, {useEffect} from "react"
import AddExpense from "./components/expense/addExpense";
import Expense from "./components/expense/expense";
import AddGroup from "./components/group/addGroup";
import Groups from "./components/group/group";
// import SearchBar from "./components/searchBar";
import { useAuthContext } from "./context/authContext";
import Login from "./pages/signin";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGroup } from "./redux/groupSlice";
import { setUser } from "./redux/userSlice";
import { setExpense } from "./redux/expenseSlice";
import { setBalance } from "./redux/balanceSlice";
import Signup from "./pages/signup";
import Balance from "./components/balance/balance";
import Navbar from "./components/navbar";

function App() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>;
  }
  const dispatch = useDispatch();

  useEffect(() => {
    const handleGroups = async () => {
      try {
        const responseGroups = await fetch("http://localhost:5000/api/groups", {
          credentials: "include"
        });
        const groups = await responseGroups.json();
        dispatch(setGroup(groups));
        const responseUsers = await fetch("http://localhost:5000/api/auth/all", {
          credentials: "include"
        });
        const users = await responseUsers.json();
        dispatch(setUser(users));
        const responseExpense = await fetch("http://localhost:5000/api/expenses/all", {
          credentials: "include"
        });
        const expense = await responseExpense.json();
        dispatch(setExpense(expense));
        const responseBalances = await fetch("http://localhost:5000/api/balances/all", {
          credentials: "include"
        });
        const balance = await responseBalances.json();
        dispatch(setBalance(balance.data));
      } catch (err) {
        console.log(err);
      }
    };
    handleGroups();
  }, [dispatch]);

  return (
    <div>
      <Navbar/>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/" element={user ? <Expense /> : <Login />} />
      <Route path="/groups/add" element={user ? <AddGroup /> : <Login />} />
      <Route path="/groups" element={user ? <Groups /> : <Login />} />
      <Route path="/balance" element={user ? <Balance /> : <Login />} />
      {/* <Route
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
        /> */}
      <Route path="/expense/add" element={user?<AddExpense/>:<Login/>}/>
    </Routes>
    </div>
  );
}

export default App;
