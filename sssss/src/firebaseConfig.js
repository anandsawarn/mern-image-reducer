import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCtfus_LYElSvozMFTghztXtpT98Nsn-40",
    authDomain: "mern-image-reducer.firebaseapp.com",
    projectId: "mern-image-reducer",
    storageBucket: "mern-image-reducer.firebasestorage.app",
    messagingSenderId: "264422517461",
    appId: "1:264422517461:web:dcaa5fb49cea25c340905c",
    //measurementId: "G-ZLETFM4VZV"
  };
  
  // Initialize Firebase

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export default app;