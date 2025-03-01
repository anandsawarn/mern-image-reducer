import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Navbar from "./Components/Navbar";
import ImageReduce from "./Components/ImageReduce"; // ✅ Import Upload correctly
import { AuthProvider } from "./Context/AuthContext"; // ✅ Only AuthProvider needed
import MergePDF from "./Components/MergePDF";
import SplitPDF from "./Components/SplitPDF";
import CompressPDF from "./Components/CompressPDF";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <div className="mt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ImageReduce" element={<ImageReduce />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/merge-pdf" element={<MergePDF />} />
            <Route path="/split-pdf" element={<SplitPDF />} />
            <Route path="/compress-pdf" element={<CompressPDF />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
