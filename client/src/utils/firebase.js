// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPJSKPPC6gZeRiYVwVgrNHNMm6KoU9_5g",
  authDomain: "upsatze.firebaseapp.com",
  projectId: "upsatze",
  storageBucket: "upsatze.appspot.com",
  messagingSenderId: "534410762743",
  appId: "1:534410762743:web:a47f55770088789f2936f2",
  measurementId: "G-XRWBBTPXZ9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);