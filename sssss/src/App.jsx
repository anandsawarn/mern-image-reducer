import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Navbar from "./Components/Navbar";  // ✅ Ensure this import is correct
import ImageReduce from "./Components/ImageReduce"; 
import MergePDF from "./Components/MergePDF";
import SplitPDF from "./Components/SplitPDF";
import CompressPDF from "./Components/CompressPDF";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { AuthProvider } from "./Context/AuthContext"; // ✅ Correct
import { AuthContext } from "./Context/AuthContext"; // ✅ Correct

// Protected Route
const PrivateRoute = ({ element }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? element : <Navigate to="/login" />;
};

// Public Route
const PublicRoute = ({ element }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? <Navigate to="/" /> : element;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />  {/* ✅ Make sure this is defined */}
        <div className="mt-20">
          <Routes>
            <Route path="/login" element={<PublicRoute element={<Login />} />} />
            <Route path="/register" element={<PublicRoute element={<Register />} />} />
            <Route path="/" element={<Home />} />
            <Route path="/ImageReduce" element={<PrivateRoute element={<ImageReduce />} />} />
            <Route path="/merge-pdf" element={<PrivateRoute element={<MergePDF />} />} />
            <Route path="/split-pdf" element={<PrivateRoute element={<SplitPDF />} />} />
            <Route path="/compress-pdf" element={<PrivateRoute element={<CompressPDF />} />} />
            <Route path="/signup" element={<PublicRoute element={<SignUp />} />} />
            <Route path="/signin" element={<PublicRoute element={<SignIn />} />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

