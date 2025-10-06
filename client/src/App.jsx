import Expense from './components/expense/expense';
import Groups from './components/group/group';
import { useAuthContext } from './context/authContext';
import Login from './pages/signin';
import { Routes, Route } from 'react-router-dom';

function App() {
  const {user, loading} = useAuthContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Expense/> : <Login/>} />
      <Route path="/groups/add" element={user ? <Groups/> : <Login/>} />
    </Routes>
  );
}

export default App;
