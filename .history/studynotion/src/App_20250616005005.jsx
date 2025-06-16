import "./App.css"
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home"

function App() {
  return (
    <div className="w-full min-h-screen bg-[#050d1a] flex flex-col font-inter">
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
