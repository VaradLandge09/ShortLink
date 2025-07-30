import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);


    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"))
        if(storedUser) {
            setUser(storedUser)
        }
    }, [])

    const login = (userData) => {
        setUser(userData);
        console.log(userData)
        localStorage.setItem("user", JSON.stringify(userData))
    }

    const logout = () => {
        localStorage.removeItem("user")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}