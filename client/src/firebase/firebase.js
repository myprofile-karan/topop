import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAzDNTNdSFEtP-tyekfRNxScxL0S7zl7BU",
  authDomain: "topoploginsignup.firebaseapp.com",
  projectId: "topoploginsignup",
  storageBucket: "topoploginsignup.appspot.com",
  messagingSenderId: "340475851016",
  appId: "1:340475851016:web:6f3a79e5ae11e69f6fbcbd",
  measurementId: "G-PEJMBB8HCB",
  dataBaseURL: "https://topoploginsignup-default-rtdb.firebaseio.com"
  
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);