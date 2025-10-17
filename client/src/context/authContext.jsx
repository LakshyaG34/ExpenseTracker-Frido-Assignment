import {createContext, useContext, useState, useEffect} from "react"

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await fetch("/api/auth/me", {
            method : "GET",
            headers: {
            "Content-Type": "application/json",
          },
          credentials: "include"
        });
        if (!response.ok) throw new Error("Error in context fetch");
        const data = await response.json();
        console.log(data);
        if (data) {
          setUser(data.user);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    handleFetch();
  }, []);

  return (
    <AuthContext.Provider value={{user, setUser, loading}}>
      {children}
    </AuthContext.Provider>
  );
};
