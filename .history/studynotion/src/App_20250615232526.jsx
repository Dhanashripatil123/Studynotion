import { React } from 'react'
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home"
function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
