import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router";


export default function ProtectedRoute({children}:{children: React.ReactNode}){
    const {user} = useContext<any>(AuthContext);

    if(!user){
        return <Navigate to={"/login"} />
    }

    return children;
}