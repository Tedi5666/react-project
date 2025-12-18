import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        async function loggingOut() {
            await logout();
            localStorage.clear();
            navigate('/');
        }

        loggingOut();
    }, []);
    return (
        <></>
    );
}