import {createContext, useContext, useState, useEffect} from "react"

export const AuthContext = createContext();

export const useAuthContext = () =>{
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    useEffect(()=>{
        const handleFetch = async() =>{
            try{
                const response = await fetch("http://localhost:5000/api/me", {
                    credentials:"include"
                })
                if (!response.ok) {
                throw new Error("Error in context fetch");
                }
                const data = await response.json();
                if(data)
                {
                    setUser(data.user);
                }
            }catch(err)
            {
                console.log(err);
            }
        }
        handleFetch();
    }, [])

    const value = {user, setUser};
    return <AuthContext.Provider value = {value}>{children}</AuthContext.Provider>
}