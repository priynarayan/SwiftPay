import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Me = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if(!token){
            navigate("/signin");
        }
        else {
            navigate("/dashboard");
        }
    },[])

    return (
        <div>

        </div>
    )
}