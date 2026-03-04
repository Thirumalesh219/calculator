// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqqsWp62UjNHf4tGVPwLKsFU2kbpTYFCE",
  authDomain: "calculator-6e576.firebaseapp.com",
  projectId: "calculator-6e576",
  storageBucket: "calculator-6e576.firebasestorage.app",
  messagingSenderId: "22875961683",
  appId: "1:22875961683:web:df67b39bb69cba00fa49a6",
  measurementId: "G-FN1E0Q0N83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);