import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { Me } from "./pages/Me"
import { UpdateProfile } from "./pages/UpdateProfile";
import { Toaster } from 'sonner';

function App() {

  return (
    <div>
        <Toaster/>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/send" element={<SendMoney/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/" element={<Me/>}/>
            <Route path="/edit" element={<UpdateProfile/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
