import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate  } from "react-router-dom";
import { Tooltip } from "@material-tailwind/react";

export default function Navbar() {
  let location = useLocation();
  const navigate = useNavigate();
  let path = location.pathname;
  const [toggle, setToggle] = useState(false);
  const [menuOpenedByClick, setMenuOpenedByClick] = useState(false);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("jwt");
    window.location.href = "/login";
  };

  const handleScroll = () => {
    if (menuOpenedByClick) {
      setMenuOpenedByClick(false);
    } else if (window.scrollY !== 0 && toggle) {
      setToggle(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    //eslint-disable-next-line
  }, [menuOpenedByClick, toggle]);

  return (
    <>
      <header
        className="bg-gray-800 body-font sm:p-0 p-2"
        style={{ fontFamily: "math" }}
      >
        <div className="flex p-4 flex-row justify-between md:flex-row items-center">

          {/* This is for Logo and Notex */}
          <Link
            className="flex title-font font-medium items-center text-white sm:mb-4 mb-0 md:mb-0"
            to="/"
          >
            <img className="w-8 h-8" src="favicon.webp" alt="logo" />
            <span className="ml-3 sm:text-lg text-2xl mr-2">Notex</span>
          </Link>

          {/* This is the Navbar for desktop screen */}
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-200	mx-10 hidden sm:flex items-center text-base justify-center">
            <Link
              className={`${
                path === "/" ? "text-gray-100" : "text-gray-400"
              } text-lg hover:text-gray-100 cursor-pointer`}
              to="/"
            >
              Home
            </Link>
            <Link
              className={`${
                path === "/about" ? "text-gray-100" : "text-gray-400"
              } mx-5 text-lg  hover:text-gray-100 cursor-pointer`}
              to="/about"
            >
              About
            </Link>
          </nav>

          {/* This is for the User Profile */}
          <Tooltip content="Your Profile" placement="bottom">
            <div
              className="sm:w-9 sm:h-9 w-12 h-12 bg-white rounded-full mx-4 hidden sm:flex justify-center focus:outline-none items-center cursor-pointer hover:bg-gray-300"
              onClick={handleProfileClick}
            >
             <i className="fa-regular fa-user"></i>
            </div>
          </Tooltip>

          {/* This is the logout button */}
          <button
            className="text-l bg-white border-0 my-2 sm:my-0 md:mt-0 py-2 px-3 focus:outline-none hover:bg-gray-300 rounded hidden sm:flex flex-shrink-0 whitespace-nowrap"
            onClick={handleLogoutClick}
          >
            Log out
          </button>

          {/* This is the Mobile Menu */}
          <div
            className="sm:hidden sm:mr-8 flex flex-1 justify-end items-center"
            onClick={() => {
              setToggle(!toggle);
              setMenuOpenedByClick(true);
            }}
          >
            {toggle ? (
              <i
                className="fa-solid fa-xmark text-3xl"
                style={{ color: "#f7f9fd" }}
              ></i>
            ) : (
              <i
                className="fa-solid fa-bars text-2xl"
                style={{ color: "#f1f4f9" }}
              ></i>
            )}
            <div
              className={`${
                !toggle ? "hidden" : "flex"
              } p-6 bg-gray-600 absolute top-20 right-0 mx-4 my-2 w-4/12 z-10 rounded-xl justify-center`}
            >
              <ul className="list-none flex justify-end items-center flex-col gap-4">
                <li
                  className="text-white font-poppins font-medium cursor-pointer text-lg"
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  <Link to="/">Home</Link>
                </li>

                <li
                  className="text-white font-poppins font-medium cursor-pointer text-lg"
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  <Link to="/about">About</Link>
                </li>

                <li
                  className="text-white font-poppins font-medium cursor-pointer text-lg"
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  <Link to="/profile">Profile</Link>
                </li>

                <li
                  className="text-white font-poppins font-medium cursor-pointer text-lg"
                  onClick={() => {
                    setToggle(!toggle);
                    handleLogoutClick();
                  }}
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>

        </div>
      </header>
    </>
  );
}
