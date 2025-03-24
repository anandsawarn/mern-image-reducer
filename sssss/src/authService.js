import { auth } from "./firebaseConfig";  // Check if this file exists!
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Sign-Up Function
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error in sign-up:", error.message);
    throw error;
  }
};

// 🔥 Fixed Sign-In Function (Uses Firebase)
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error in sign-in:", error.message);
    throw error;
  }
};

// Sign-Out Function
export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error in sign-out:", error.message);
  }
};
