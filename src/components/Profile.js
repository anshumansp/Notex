import React, { useEffect, useRef, useContext } from "react";
import NoteContext from "../context/noteContext";
const API_URL = process.env.REACT_APP_BACK_URL;

function Profile() {
  const context = useContext(NoteContext);
  const { notes, fetchNotes } = context;
  const dataRef = useRef({});

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("jwt");
      const response = await fetch(`${API_URL}/api/auth/getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      const fetchedData = await response.json();
      dataRef.current = fetchedData;
      await fetchNotes();
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className="flex flex-col justify-start items-center md:w-1/4 sm:w-3/4 mx-8 text-xl sm:mx-auto mt-12"
      style={{ fontFamily: "math" }}
    >
      <div className="flex justify-start w-full font-bold text-2xl mb-8 pb-6 border-b-2 border-black ">
        {" "}
        Your Profile:{" "}
      </div>

      <div className="flex justify-start w-full mb-4 pb-10">
        <ul>
          <li className="mb-10">
            <strong className="mr-2 sm:mr-6">Name : </strong>
            <span> {dataRef.current.name} </span>
          </li>
          <li className="my-10">
            <strong className="mr-2 sm:mr-6">Email : </strong>
            <span> {dataRef.current.email} </span>
          </li>
          <li className="my-10">
            <strong className="mr-2 sm:mr-6">Notes : </strong>
            <span> {notes.length} </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Profile;
