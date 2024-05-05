import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/auth/Signup.jsx";
import { Toaster } from "react-hot-toast";
import UserProfile from "./components/userProfile/UserProfile.jsx";
import Login from "./components/auth/Login.jsx";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate relace to="/signup" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-profile/:email" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>

      <Toaster />
    </div>
  );
};

export default App;
