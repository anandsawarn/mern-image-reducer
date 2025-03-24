import { createContext, useState, useEffect } from "react";
import { auth } from "../firebaseConfig"; // ✅ Ensure correct path

export const AuthContext = createContext(null); // ✅ Named export

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
