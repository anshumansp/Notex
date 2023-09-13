import React, { useState } from "react";
import NoteContext from "./noteContext";
const API_URL = process.env.REACT_APP_BACK_URL;

const NoteState = (props) => {
  // Setting Notes in the State - Initialising Empty
  const [notes, setNotes] = useState([]);

  // Setting Open State of the Dialog Box - Initialising False
  const [open, setOpen] = useState(false);

  // Setting Note Content of the Dialog Box - Initialising Empty
  const [dialogNote, setDialogNote] = useState({
    title: "",
    description: "",
    id: "",
  });

  // Function to handle Opening and Closing of Edit Dialog Box
  const handleOpen = (note) => {
    setOpen(!open);
    if (!note) {
      return;
    }
    const { title, description, _id } = note;
    setDialogNote({ title: title, description: description, id: _id });
  };

  // Getting all the Notes
  const fetchNotes = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      window.location.href = "/login";
    }
    const response = await fetch(`${API_URL}/api/notes/getallnotes`, {
      method: "GET",
      headers: {
        "auth-token": token,
      },
    });
    const data = await response.json();

    if (data.status === "Success") {
      const notesArray = data.notes;
      setNotes(notesArray);
      return;
    } else {
      return data;
    }
  };

  // Adding a Note
  const addNote = async (note) => {
    const token = localStorage.getItem("jwt");

    const response = await fetch(`${API_URL}/api/notes/createnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(note),
    });

    await fetchNotes();
    const data = await response.json();
    return data;
  };

  // Saving a Note
  const saveNote = async (id) => {
    const updatedNote = {};
    const { title, description } = dialogNote;

    for (let i = 0; i < notes.length; i++) {
      if (notes[i]._id === id) {
        notes[i].title = title;
        notes[i].description = description;

        updatedNote.title = title;
        updatedNote.description = description;
      }
    }
    handleOpen();

    const token = localStorage.getItem("jwt");
    const response = await fetch(`${API_URL}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(updatedNote),
    });
    const data = await response.json();
    return data;
  };

  // Deleting a Note
  const deleteNote = async (id) => {
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);

    const token = localStorage.getItem("jwt");
    const response = await fetch(`${API_URL}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    const data = await response.json();
    return data;
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        fetchNotes,
        addNote,
        deleteNote,
        open,
        handleOpen,
        dialogNote,
        setDialogNote,
        saveNote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
