import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; // Import useState and useEffect hooks
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export const Dashboard = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token == null) {
            navigate("/signin")
        }
    }, [token, navigate]); // Dependency on token and navigate

    if (!token) {
        return null; 
    }

    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={"10,000"} />
            <Users />
        </div>
    </div>
}
