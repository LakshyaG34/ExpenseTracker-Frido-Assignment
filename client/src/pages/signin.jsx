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
        <form onSubmit={handleFetch} className="">
            <input type="text" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button type="submit">Submit</button>
        </form>
    )
}

export default Login;