import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../header/Header";

const UserProfile = () => {
  const [data, setData] = useState();
  const tiltRef = useRef(null);
  const { email } = useParams();

  useEffect(() => {
    async function getUser() {
      const res = await axios.get(
        `http://localhost:3001/api/user-profile/${email}`
      );
      setData(res);
    }
    getUser();
  }, []);
  const tiltMove = (x, y) =>
    `perspective(500px) scale(1.1) rotateX(${x}deg) rotateY(${y}deg)`;

  const handleMouseMove = (e) => {
    const tilt = tiltRef.current;
    const height = tilt.clientHeight;
    const width = tilt.clientWidth;

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const multiplier = 50;

    const xRotate = multiplier * ((x - width / 2) / width);
    const yRotate = -multiplier * ((y - height / 2) / height);

    tilt.style.transform = tiltMove(xRotate, yRotate);
  };

  const handleMouseOut = () => {
    const tilt = tiltRef.current;
    tilt.style.transform = tiltMove(0, 0);
  };

  return (
    <div className="bg-white">
      {data && (
        <div>
          <Header resData={data} />
          <section className="flex justify-center">
            <div
              ref={tiltRef}
              className="tilt bg-[#f7f7c0] w-[300px]  mt-16 flex flex-col items-center p-4"
              onMouseMove={handleMouseMove}
              onMouseOut={handleMouseOut}
            >
              <div className="tilt__content text-center flex justify-center">
                {data?.data?.user?.coverPhoto ? (
                  <img
                    src={data?.data?.user?.coverPhoto}
                    className="w-24 h-24 rounded-full object-cover"
                    alt="profile picture"
                  />
                ) : (
                  <i className="fa-solid fa-user text-2xl sm:text-4xl bg-gray-300 hover:bg-gray-400 transition-all w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full cursor-pointer"></i>
                )}
              </div>
              <div className="content">
                <h1 className="text-2xl font-bold text-center uppercase underline">
                  {data?.data?.user?.name}
                </h1>
                <div className="moreinfo text-gray-500 flex gap-3 justify-center mt-1">
                  <span>Name:</span>
                  <span>{data?.data?.user?.name}</span>
                </div>
                <div className="moreinfo text-gray-500 flex gap-3 justify-center mt-1">
                  <span>Email:</span>
                  <span>{data?.data?.user?.email}</span>
                </div>
                <div className="moreinfo text-gray-500 flex gap-3 justify-center mt-1">
                  <span>Phone Number:</span>
                  <span>{data?.data?.user.phoneNumber}</span>
                </div>
                <div className="qrcode mt-10 flex justify-center">
                  <img
                    src={data?.data?.qrCode}
                    className="w-[200px] h-[200px]"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
