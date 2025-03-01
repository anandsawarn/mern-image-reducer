import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion"; // Animation library
import { Menu, X, User } from "lucide-react"; // Icons for UI

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Get user authentication data
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu state
  const [authDropdownOpen, setAuthDropdownOpen] = useState(false); // Auth dropdown state

  // Close auth dropdown when clicking outside
  useEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest(".auth-dropdown")) {
        setAuthDropdownOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg fixed w-full top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        
        {/* ✅ Logo */}
        <Link to="/" className="flex items-center text-white font-semibold text-lg">
        <div className="absolute left-0 top-4 ml-2">
  <img 
    src="https://raw.githubusercontent.com/ddavison/chrome-youtube-resizer/master/src/images/resizer-logo.png" 
    alt="logo" 
    className="h-9 w-13"
  />
</div>

          
        </Link>

        {/* ✅ Mobile Menu Button (Visible only on small screens) */}
        <button className="lg:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* ✅ Navigation Links */}
        <div className={`lg:flex items-center space-x-6 
                         ${menuOpen ? "block" : "hidden"} 
                         absolute lg:static top-16 left-0 w-full lg:w-auto 
                         bg-gradient-to-r from-blue-500 to-purple-500 lg:bg-transparent lg:p-0 p-4`}
        >
          {/* General Links */}
          <Link to="/" className="block lg:inline-block bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition shadow-md" 
                onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/ImageReduce" className="block lg:inline-block bg-black text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition shadow-md" 
                onClick={() => setMenuOpen(false)}>ImageReduce</Link>

          {/* ✅ PDF Tools Links (Merge, Compress, Split) */}
          <div className="lg:flex space-x-4 block">
            <Link to="/merge-pdf" className="block lg:inline-block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition shadow-md" 
                  onClick={() => setMenuOpen(false)}>Merge PDF</Link>
            <Link to="/compress-pdf" className="block lg:inline-block bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition shadow-md" 
                  onClick={() => setMenuOpen(false)}>Compress PDF</Link>
            <Link to="/split-pdf" className="block lg:inline-block bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition shadow-md" 
                  onClick={() => setMenuOpen(false)}>Split PDF</Link>
          </div>
        </div>

        {/* ✅ Auth Section (Sign In/Sign Up OR Logout) */}
        <div className="relative auth-dropdown">
          {/* User Icon (Click to open dropdown) */}
          <button
            onClick={() => setAuthDropdownOpen(!authDropdownOpen)}
            className="text-white flex items-center"
          >
            <User size={28} />
          </button>

          {/* ✅ Auth Dropdown Menu (Animated with Framer Motion) */}
          <AnimatePresence>
            {authDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden"
              >
                {/* Show Sign In/Sign Up if not logged in */}
                {!user ? (
                  <>
                    <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-blue-500 hover:text-white transition" 
                          onClick={() => setAuthDropdownOpen(false)}>Sign In</Link>
                    <Link to="/register" className="block px-4 py-2 text-gray-700 hover:bg-blue-500 hover:text-white transition" 
                          onClick={() => setAuthDropdownOpen(false)}>Sign Up</Link>
                  </>
                ) : (
                  // Show Logout if logged in
                  <button onClick={logout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition">
                    Log Out
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
