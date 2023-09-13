import React, {useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

function Alert(props) {
  let location = useLocation();
  let path = location.pathname;

  const [isNavbar, setisNavbar] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', ()=> {
      if(window.scrollY > 0) {
        setisNavbar(false)
      } else {
        setisNavbar(true)
      }
    });

    if(path === "/login" || path === "/signup") {
      setisNavbar(false)
    }

    // eslint-disable-next-line
  }, []);

  
  return (
    props.alert ? (
      <div className={`bg-gray-300 text-black fixed p-4 sm:right-10 right-6 rounded-md z-20 ${
        isNavbar ? 'top-8 sm:top-24' : 'top-20 sm:top-12'
      }`}>
        <strong>{props.alert.type} : </strong>
        {props.alert.message}
      </div>
    ) : null
  );
}

export default Alert;
