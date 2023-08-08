import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PortfolioPost from "./pages/PortfolioPost";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route element={<Home/>} path="/" exact />
        <Route element={<PortfolioPost/>} path="/portfolio/:slug" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
