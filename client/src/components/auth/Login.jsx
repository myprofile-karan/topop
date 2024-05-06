import { useRef, useState } from "react";
import axios from "axios";
import {
  signupWithGoogle,
} from "../../firebase/createWithEmail";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (email === "" || password === "") {
        setValidationErrors(true);
        setLoading(false);
        return;
      }

      const existingUser = await axios.get(
        `http://localhost:3001/api/check-user/${email}`
      );

      if (!existingUser.data.exists) {
        toast.error("User not found! Please signup first.");
        console.log("user not exist")
      } else {
        toast.success("Login successful");
        navigate(`/user-profile/${email}`);
      }
    } catch (error) {
      toast.error("signup failded");
      throw new error();
    } finally {
      setLoading(false);
    }
  };
  const googleSignup = async () => {
    const res = await signupWithGoogle();
    console.log(res.user.email);
    navigate(`/user-profile/${res?.user?.email}`);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="signup-right md:w-3/5 w-full h-full flex items-center relative">
        <form className="w-[90%] sm:w-[70%] md:w-[85%] lg:w-[70%] mx-auto self-center bg-transparent p-6 rounded-md flex flex-col border">
          <h2 className="text-3xl font-bold mb-3">Login</h2>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 items-center gap-1">
              <label
                htmlFor="email"
                className="text-gray-800 font-bold text-sm md:text-[1.1rem]"
              >
                Email
              </label>
              <input
                id="email"
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`md:p-2 p-1 border rounded-md focus:outline-none ${
                  validationErrors ? "bg-[#feeeee]" : "bg-[#f3f3f3]"
                }`}
                required
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-1 relative">
              <label
                htmlFor="password"
                className="text-gray-800 font-bold text-sm md:text-[1.1rem]"
              >
                Password
              </label>
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="6+ characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`md:p-2 p-1 border rounded-md focus:outline-none ${
                  validationErrors ? "bg-[#feeeee]" : "bg-[#f3f3f3]"
                }`}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-0 text-sm"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>
            </div>

            <span className="text-sm">
              Not a user?{" "}
              <Link to="/signup" className="text-blue-700">
                Signup here
              </Link>
            </span>
          </div>

          <button
            onClick={handleSignup}
            className="text-white bg-[#EA4B8B] py-2 sm:w-[100%] rounded-md mt-6"
          >
            {loading ? "loading.." : "Create account"}
          </button>
          <button
            onClick={googleSignup}
            className="text-white bg-gray-800 py-2 sm:w-[100%] rounded-md mt-3"
          >
            <i className="fa-brands fa-google me-3"></i>
            {loading ? "loading.." : "Sign Up with google"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
