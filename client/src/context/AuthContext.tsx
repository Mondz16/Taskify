import React, { createContext , useState} from "react";

export const AuthContext = createContext<{
    user: any;
    login: (data:any) => void;
    logout: () => void;
} | null>(null);

export const AuthProvider = ({children}: {children:React.ReactNode}) => {
    const [user, setUser] = useState<any>(
        typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("user") || 'null'): null
    );

    const login = (data:any) => {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
    }

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, login , logout}}>
            {children}
        </AuthContext.Provider>
    );
}

