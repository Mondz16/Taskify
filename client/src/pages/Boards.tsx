import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router";

export default function Boards() {
    const {logout} = useContext<any>(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <div style={{padding: "20px"}}>
            <h2>Your Boards</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}