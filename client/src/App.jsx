import Expense from './components/expense';
import { useAuthContext } from './context/authContext'
import Login from './pages/signin'
import { Routes, Route } from 'react-router-dom'

function App() {
  const {user} = useAuthContext();
  return (
    <Routes>
      <Route path="/" element={
        user ? <Expense/> : <Login/>
      }/>
    </Routes>
  )
}

export default App
