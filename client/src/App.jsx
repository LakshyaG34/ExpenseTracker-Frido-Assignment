import Expense from "./components/expense/expense";
import AddGroup from "./components/group/addGroup";
import Groups from "./components/group/group";
import SearchBar from "./components/searchBar";
import { useAuthContext } from "./context/authContext";
import Login from "./pages/signin";
import { Routes, Route } from "react-router-dom";

function App() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Expense /> : <Login />} />
      <Route path="/groups/add" element={user ? <AddGroup /> : <Login />} />
      <Route path="/groups" element={user ? <Groups /> : <Login />} />
      <Route
        path="/expense"
        element={
          user ? (
            <>
              <SearchBar />
              <Expense />
            </>
          ) : (
            <Login />
          )
        }
      />
    </Routes>
  );
}

export default App;
