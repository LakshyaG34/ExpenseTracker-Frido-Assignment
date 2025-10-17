import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { useState } from "react";
// import image1 from "../assets/1.jpg"
import image2 from "../assets/2.webp"
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials : "include"
      });
      if (!response.ok) {
        throw new Error("Error logging out");
      }
      setUser(null);
      // alert("Logged out!!!");
      toast.success("Logged Out successfully")
    } catch (err) {
      console.log(err);
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-xl z-50">
        <div className="flex justify-between items-center p-4">
          <div>
            <button
              onClick={() => navigate("/")}
              className="font-bold text-2xl text-black cursor-pointer"
            >
              <img src={image2} className="w-24 h-8"/>
            </button>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => navigate("/expense/add")}
              className="border border-black text-black rounded-2xl px-2 py-1 cursor-pointer hover:bg-blue-100 transition-all duration-200"
            >
              Add Expense
            </button>
            <button
              onClick={() => navigate("/balance")}
              className="border border-black text-black rounded-2xl px-2 py-1 cursor-pointer hover:bg-blue-100 transition-all duration-200"
            >
              Balances
            </button>
            <button
              onClick={() => navigate("/groups")}
              className="border border-black text-black rounded-2xl px-2 py-1 cursor-pointer hover:bg-blue-100 transition-all duration-200"
            >
              Groups
            </button>
            <button
              onClick={() => navigate("/groups/add")}
              className="border border-black text-black rounded-2xl px-2 py-1 cursor-pointer hover:bg-blue-100 transition-all duration-200"
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
                  onClick={() => navigate("/login")}
                  className="border border-red-400 text-red-400 rounded-2xl px-2 py-1 cursor-pointer hover:bg-red-100 transition-all duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="border border-red-400 text-red-400 rounded-2xl px-2 py-1 cursor-pointer hover:bg-red-100 transition-all duration-200"
                >
                  SignUp
                </button>
              </div>
            )}
          </div>
          <div className="md:hidden relative">
            <button onClick={() => setIsOpen(!isOpen)} className="text-[25px] text-black relative">
              {" "}
              ={" "}
            </button>
            {isOpen && (
              <>
                {user ? (
                  <div className="flex flex-col gap-1 absolute -left-25 top-12 z-40 border border-white bg-white/70 p-4 rounded-lg">
                    <button
                      onClick={() => navigate("/expense/add")}
                      className="bg-white border border-black text-black rounded-2xl px-2 py-1 cursor-pointer hover:bg-blue-100 transition-all duration-200"
                    >
                      Add Expense
                    </button>
                    <button
                      onClick={() => navigate("/balance")}
                      className="bg-white border border-black text-black rounded-2xl px-2 py-1 cursor-pointer hover:bg-blue-100 transition-all duration-200"
                    >
                      Balances
                    </button>
                    <button
                      onClick={() => navigate("/groups")}
                      className="bg-white border border-black text-black rounded-2xl px-2 py-1 cursor-pointer hover:bg-blue-100 transition-all duration-200"
                    >
                      Groups
                    </button>
                    <button
                      onClick={() => navigate("/groups/add")}
                      className="bg-white border border-black text-black rounded-2xl px-2 py-1 cursor-pointer hover:bg-blue-100 transition-all duration-200"
                    >
                      Create Groups
                    </button>
                    <button
                      onClick={handleLogout}
                      className="bg-red-500/60 border border-red-400 text-red-600 rounded-2xl px-4 py-2 cursor-pointer hover:bg-red-100 transition-all duration-200"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1 absolute -left-25 top-12 z-40 border border-white bg-white/70 p-4 rounded-lg">
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
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
  );
};

export default Navbar;
