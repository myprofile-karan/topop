import { useRef, useState } from "react";
import axios from "axios";
import {
  createWithEmail,
  signupWithGoogle,
} from "../../firebase/createWithEmail";
import toast from "react-hot-toast";
import uploadImage from "../../helpers/upload";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [validationErrors, setValidationErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (
        name === "" ||
        phoneNumber === "" ||
        email === "" ||
        password === ""
      ) {
        setValidationErrors(true);
        setLoading(false);
        return;
      }

      const existingUser = await axios.get(
        `http://localhost:3001/api/check-user/${name}`
      );

      if (existingUser.data.exists) {
        toast.error("User already exists");
      } else {
        const image_url = await uploadImage(coverPhoto);

        const response = await axios.post("http://localhost:3001/api/signup", {
          image_url,
          name,
          phoneNumber,
          email,
          password,
          termsAccepted,
        });

        const emailRes = await createWithEmail(email, password);
        console.log(emailRes);
        toast.success("signup successful");
        navigate(`/user-profile/${email}`);
      }
    } catch (error) {
      toast.error("signup failded");
      throw new error();
    } finally {
      setLoading(false);
    }
  };
  const handleImageClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handleCoverChange = (e) => {
    setCoverPhoto(e.target.files[0]);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="signup-right md:w-3/5 w-full h-full flex items-center relative">
        <form className="w-[90%] sm:w-[70%] md:w-[85%] lg:w-[70%] mx-auto self-center bg-transparent p-6 rounded-md flex flex-col border">
          <h2 className="text-3xl font-bold mb-3">Sign up</h2>

          <div className="flex gap-10">
            <div className="w-full avatar-section flex  gap-2">
              <div className="flex flex-col">
                <div className="app">
                  <input
                    type="file"
                    ref={inputRef}
                    onChange={handleCoverChange}
                    className="hidden app_uploadInput"
                  />
                </div>

                {coverPhoto && (
                  <img
                    src={URL.createObjectURL(coverPhoto)}
                    className="w-24 h-24 rounded-full object-cover border-4 border-pink-600"
                    alt=""
                  />
                )}
              </div>
              {!coverPhoto && (
                <i
                  onClick={handleImageClick}
                  className="fa-solid fa-user text-2xl sm:text-4xl bg-gray-300 hover:bg-gray-400 transition-all w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center rounded-full cursor-pointer"
                ></i>
              )}
            </div>
          </div>
          <div className="grid gap-4 md:mt-8 mt-8 ">
            <div className="names grid grid-cols-2 gap-4">
              <div className="grid grid-cols-1 items-center gap-1">
                <label
                  htmlFor="name"
                  className="text-gray-800 font-bold text-xs md:text-[1.1rem]"
                >
                  Username
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`md:p-2 p-1 border rounded-md focus:outline-none ${
                    validationErrors ? "bg-[#feeeee]" : "bg-[#f3f3f3]"
                  }`}
                  required
                />
              </div>

              <div className="grid grid-cols-1 items-center gap-1">
                <label
                  htmlFor="phone"
                  className="text-gray-800 font-bold text-sm md:text-[1.1rem]"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="text"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={`md:p-2 p-1 border rounded-md focus:outline-none ${
                    validationErrors ? "bg-[#feeeee]" : "bg-[#f3f3f3]"
                  }`}
                />
              </div>
            </div>
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
              Already a user?{" "}
              <Link to="/login" className="text-blue-700">
                Signup here
              </Link>
            </span>
            <div className="relative flex items-start gap-1">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                className={`mr-2 mt-1 md:mt-2 border-2 border-red-500`}
              />
              <label
                htmlFor="terms"
                className="text-gray-800 font-semibold text-xs md:text-[1rem]"
              >
                Creating an account means you're okay with our{" "}
                <span className="text-blue-600">
                  Terms and Services, Privacy Policy{" "}
                </span>{" "}
                and our default{" "}
                <span className="text-blue-600">Notification Settings.</span>
              </label>
              {validationErrors && (
                <p className="text-red-500 text-xs block">*required</p>
              )}
            </div>{" "}
          </div>

          <button
            onClick={handleSignup}
            className="text-white bg-[#EA4B8B] py-2 sm:w-[100%] rounded-md mt-6"
          >
            {loading ? "loading.." : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
