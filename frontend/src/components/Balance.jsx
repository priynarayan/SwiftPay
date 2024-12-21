import { useEffect, useState } from "react";
import axios from "axios";

export const Balance = ({ value }) => {
    const token = localStorage.getItem("token");
    const [amount, setAmount] = useState("");
    useEffect(() => {
        const getBalance = async () => {
            const response = await axios.get("https://swift-pay-ecru.vercel.app/api/v1/account/balance", {
                headers: {
                Authorization: `Bearer ${token}`, // Include token
                }
            })
            setAmount(Math.floor(response.data.balance));
        }     
        getBalance();
    }, [token])

    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance:
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs. {amount}
        </div>
    </div>
}