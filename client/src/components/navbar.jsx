import { useNavigate } from "react-router-dom";

const Navbar = () =>{
    const navigate = useNavigate();
    return(
        <div className="flex justify-between items-center p-4 sticky top-0 bg-white/80 backdrop-blur-sm shadow-md z-50">
            <div>
                <button onClick = {()=>navigate("/")} className="font-bold text-lg text-orange-400 hover:text-blue-800 transition-colors duration-200">Frido-Assignment</button>
            </div>
            <div className="flex gap-2">
                <button onClick={()=>navigate("/expense/add")} className="border border-blue-400 text-blue-400 rounded-2xl px-2 py-1 cursor-pointer hover:bg-blue-100 transition-all duration-200">Add Expense</button>
                <button onClick={()=>navigate("/balance")} className="border border-blue-400 text-blue-400 rounded-2xl px-2 py-1 cursor-pointer hover:bg-blue-100 transition-all duration-200">Balances</button>
                <button onClick={()=>navigate("/groups")} className="border border-blue-400 text-blue-400 rounded-2xl px-2 py-1 cursor-pointer hover:bg-blue-100 transition-all duration-200">Groups</button>
                <button onClick={()=>navigate("/groups/add")} className="border border-blue-400 text-blue-400 rounded-2xl px-2 py-1 cursor-pointer hover:bg-blue-100 transition-all duration-200">Create Groups</button>
            </div>
            <div className="flex gap-2">
                <button onClick={()=>navigate("/login")} className="border border-red-400 text-red-400 rounded-2xl px-2 py-1 cursor-pointer hover:bg-red-100 transition-all duration-200">Login</button>
                <button onClick = {()=>navigate("/signup")} className="border border-red-400 text-red-400 rounded-2xl px-2 py-1 cursor-pointer hover:bg-red-100 transition-all duration-200">SignUp</button>
            </div>
        </div>
    )
}

export default Navbar;