import React, {useState} from "react"
import { useAuthContext } from "../context/authContext";

const Login = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setUser} = useAuthContext();

    const handleFetch = async(e) =>{
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method : "POST",
                headers: {
                    "Content-type" : "application/json"
                },
                credentials : "include",
                body : JSON.stringify({email, password})
            })
            if(!response.ok)
            {
                throw new Error("Error Fetching");
            }
            const data = await response.json();
            setUser(data);
            setEmail("");
            setPassword("");
            alert("Signed In")
            console.log(data);
        }catch(err)
        {
            console.log(err);
        }
    }
    return(
        <form onSubmit={handleFetch} className="flex flex-col gap-2 justify-center items-center min-h-screen">
            <input type="text" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} className="border border-black rounded-lg p-1"/>
            <input type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="border border-black rounded-lg p-1"/>
            <button type="submit" className="bg-blue-500 rounded-xl p-2 text-white focus:outline-none focus:ring-blue-500 focus:bg-blue-600 cursor-pointer">Submit</button>
        </form>
    )
}

export default Login;