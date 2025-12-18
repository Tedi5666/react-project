import { useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const hasLoggedOut = useRef(false);

    useEffect(() => {
        if (hasLoggedOut.current) return;

        async function loggingOut() {
            hasLoggedOut.current = true;
            try {
                await logout();
                navigate('/');
            } catch (error) {
                console.error("Logout failed:", error);
            }
        }

        loggingOut();
    }, [logout, navigate]);

    return (
        <></>
    );
}