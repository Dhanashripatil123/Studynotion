import "./App.css"
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import NavbarLinks from "./components/common/Navbar";
import signup from "./components"

function App() {
  return (
    <div className="w-full height-full min-h-screen bg-[#050d1a] flex flex-col font-inter">
     <NavbarLinks></NavbarLinks>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<signup />}></Route>
      </Routes>
     
    </div>
  );
}

export default App;
