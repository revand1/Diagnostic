// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeAP7JNrv_fbc301LtQ3SwTlYK_yiWB9s",
  authDomain: "diagnosticsresult.firebaseapp.com",
  projectId: "diagnosticsresult",
  storageBucket: "diagnosticsresult.appspot.com",
  messagingSenderId: "639999909962",
  appId: "1:639999909962:web:f637f3f89aa986e56986b3"
};

// Initialize Firebase
initializeApp(firebaseConfig);
// init firestore service
const db = getFirestore()
export default db