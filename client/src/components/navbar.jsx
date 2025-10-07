import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Error logging out");
      }
      setUser(null);
      alert("Logged out!!!");
    } catch (err) {
      console.log(err);
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm shadow-md z-50">
        <div className="flex justify-between items-center p-4">
          <div>
            <button
              onClick={() => navigate("/")}
              className="font-bold text-lg text-orange-400 hover:text-blue-800 transition-colors duration-200"
            >
              Frido-Assignment
            </button>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => navigate("/expense/add")}
              className="border border-blue-400 text-blue-400 rounded-2xl px-2 py-1 cursor-pointer hover:bg-blue-100 transition-all duration-200"
            >
              Add Expense
            </button>
            <button
              onClick={() => navigate("/balance")}
              className="border border-blue-400 text-blue-400 rounded-2xl px-2 py-1 cursor-pointer hover:bg-blue-100 transition-all duration-200"
            >
              Balances
            </button>
            <button
              onClick={() => navigate("/groups")}
              className="border border-blue-400 text-blue-400 rounded-2xl px-2 py-1 cursor-pointer hover:bg-blue-100 transition-all duration-200"
            >
              Groups
            </button>
            <button
              onClick={() => navigate("/groups/add")}
              className="border border-blue-400 text-blue-400 rounded-2xl px-2 py-1 cursor-pointer hover:bg-blue-100 transition-all duration-200"
            >
              Create Groups
            </button>
          </div>
          <div className="hidden md:flex">
            {user ? (
              <>
                <button
                  onClick={handleLogout}
                  className="border border-red-400 text-red-400 rounded-2xl px-2 py-1 cursor-pointer hover:bg-red-100 transition-all duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={()=>navigate("/login")}
                  className="border border-red-400 text-red-400 rounded-2xl px-2 py-1 cursor-pointer hover:bg-red-100 transition-all duration-200"
                >
                  Login
                </button>
                <button
                  onClick={()=>navigate("/signup")}
                  className="border border-red-400 text-red-400 rounded-2xl px-2 py-1 cursor-pointer hover:bg-red-100 transition-all duration-200"
                >
                  SignUp
                </button>
              </div>
            )}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-[25px]"> = </button>
          </div>
        </div>
      </div>
      <div className="md:hidden w-full bg-white/90 backdrop-blur-md shadow-md rounded-b-lg p-4 flex flex-col gap-2 absolute top-full left-0 z-40">
        {isOpen && (
          <>
            {user ? (
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => navigate("/expense/add")}
                  className="border border-blue-400 text-blue-400 rounded-2xl px-2 py-1 cursor-pointer hover:bg-blue-100 transition-all duration-200"
                >
                  Add Expense
                </button>
                <button
                  onClick={() => navigate("/balance")}
                  className="border border-blue-400 text-blue-400 rounded-2xl px-2 py-1 cursor-pointer hover:bg-blue-100 transition-all duration-200"
                >
                  Balances
                </button>
                <button
                  onClick={() => navigate("/groups")}
                  className="border border-blue-400 text-blue-400 rounded-2xl px-2 py-1 cursor-pointer hover:bg-blue-100 transition-all duration-200"
                >
                  Groups
                </button>
                <button
                  onClick={() => navigate("/groups/add")}
                  className="border border-blue-400 text-blue-400 rounded-2xl px-2 py-1 cursor-pointer hover:bg-blue-100 transition-all duration-200"
                >
                  Create Groups
                </button>
                <button
                  onClick={handleLogout}
                  className="border border-red-400 text-red-400 rounded-2xl px-4 py-2 cursor-pointer hover:bg-red-100 transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="border border-red-400 text-red-400 rounded-2xl px-4 py-2 cursor-pointer hover:bg-red-100 transition-all duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="border border-red-400 text-red-400 rounded-2xl px-4 py-2 cursor-pointer hover:bg-red-100 transition-all duration-200"
                >
                  SignUp
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
