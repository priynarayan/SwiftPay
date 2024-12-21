import axios from "axios"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import {useState } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export const Signin = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox placeholder="harkirat@gmail.com" label={"Email"} onchange={(e) => {
          setUsername(e.target.value);
        }}/>
        <InputBox placeholder="123456" label={"Password"} onchange={(e) => {
          setPassword(e.target.value);
        }}/>
        <div className="pt-4">
          <Button label={"Sign in"} onClick={async () => {
            axios.post("https://swift-pay-ecru.vercel.app/api/v1/user/signin", {
              username,
              password
            }).then((response) => {
              localStorage.setItem("token", response.data.token);
              navigate("/dashboard");
            }).catch((error)=>{
              toast.error(error.response.data.message)
            })
          }} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}