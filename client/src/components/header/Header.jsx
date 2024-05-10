import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ resData }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="relative py-3 px-10 bg-[#f7f7c0] flex justify-between items-center">
      <h2 className="text-2xl font-bold">Profile</h2>

      <div className="flex items-center gap-2">
        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-500 text-white font-bold uppercase">
          {resData?.data?.user?.name.charAt(0)}
        </span>
        <i
          onClick={() => setShow(!show)}
          className="fa-solid fa-angle-down text-gray-600 cursor-pointer"
        ></i>
      </div>
      {show && (
        <div className="logout-section rounded-lg absolute top-[56px] right-[10px] bg-[beige] flex flex-col justify-center items-center overflow-hidden">
          <button
            className="w-full py-2 hover:bg-[#f0f0ba]"
            onClick={handleLogout}
          >
            Log out
          </button>
          <button className="w-full py-2 px-3 hover:bg-[#f0f0ba]">
            Delete Account
          </button>
          <button className="w-full py-2 px-3 hover:bg-[#f0f0ba]">
            {resData?.data?.user?.email}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
