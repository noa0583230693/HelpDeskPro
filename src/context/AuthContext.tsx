import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { User } from "../interface/interfaces";

export type AuthContextType = {
    user: User| null;
    token:string | null;
    login: (userData: User, token: string | null) => void;
    logout: () => void;
    isAdmin: boolean;
    isAgent: boolean;
    isCustomer: boolean;
    loading: boolean;
};

export const AuthContext=createContext<AuthContextType | null>(null);
export const AuthProvider=({children}: {children: React.ReactNode})=>
{
    const [user,setUser]=useState<User | null>(null);
    const [token,setToken]=useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
     useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const storedToken = localStorage.getItem("token");
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedToken) setToken(storedToken);
    setLoading(false); // סיום טעינה
  }, []);
    
    const login = useCallback((userData: User, token: string | null) => {
        setUser(userData);
        console.log("User logged in:", userData);
        localStorage.setItem("currentUser", JSON.stringify(userData));
        setToken(token);
        if (token) {
            localStorage.setItem("token", token);    
        }
    }, []);
    
    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("currentUser");
        localStorage.removeItem("token");
    }, []);
    const isAdmin=user?.role==="admin";
    const isAgent=user?.role==="agent";
    const isCustomer=user?.role==="customer";
    return <AuthContext.Provider value={{user,token,login,logout,isAdmin,isAgent,isCustomer,loading}}>
        {children}
    </AuthContext.Provider> 
}
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) 
    {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};

export const useToken = () => {
    const { token } = useAuth();
    return token;
};


export const useUser = () => {
    const { user, isAdmin, isAgent, isCustomer } = useAuth();
    return { user, isAdmin, isAgent, isCustomer };
};

