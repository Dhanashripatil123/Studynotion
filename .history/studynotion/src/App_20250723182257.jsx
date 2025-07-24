import "./App.css"
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import NavbarLinks from "./components/common/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Update from "./pages/ForgotPassword";

function App() {
  return (
    <div className="w-full height-full min-h-screen bg-[#050d1a] flex flex-col font-inter">
     <NavbarLinks></NavbarLinks>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/ForgotPassword" element={<ForgotPassword/>}></Route>
        <Route path="/UpdatePassword" element={<ForgotPassword/>}></Route>
      </Routes>
     
    </div>
  );
}

export default App;
