import { useContext, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import NoteContext from "../context/noteContext";

function NotesItem(props) {
  const { newAlert } = props;
  const context = useContext(NoteContext);
  const { notes, fetchNotes, deleteNote, handleOpen } = context;

  useEffect(() => {
    const response = fetchNotes();
    if(response.status) {
      newAlert(response.message, response.status);
    }
    // eslint-disable-next-line
  }, []);

  const handleDeleteNote = async (id) => {
    const response = await deleteNote(id);
    newAlert(response.message, response.status);
  };

  const handleEditNote = async (note) => {
    await handleOpen(note);
  }

  return (
    <>
      <div className="mt-8 mb-2 w-full flex flex-col ">
        <Typography
          variant="h3"
          color="blue-gray"
          style={{ fontFamily: "initial" }}
        >
          Your Notes
        </Typography>
        <div className="mt-6 flex flex-wrap -mx-4">
          {notes.length === 0 ? (
            <p className="ml-5 ">No Notes to display. Please add a Note.</p>
          ) : (
            notes.map((note) => (
              <div
                key={note._id}
                className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-10"
              >
                <div className="border-black border rounded h-full bg-transparent p-4">
                  <h5 style={{ fontFamily: 'math' }} className="text-xl font-bold font-initial mb-3">
                    {note.title}
                  </h5>
                  <pre style={{ whiteSpace: 'pre-line', fontFamily: 'math' }}>{note.description}</pre>
                  <i className="fa-regular fa-pen-to-square text-xl mt-4 mr-5 hover:outline-black cursor-pointer"
                  onClick={()=> handleEditNote(note)}></i>
                  <i
                    className="fa-regular fa-trash-can text-xl mt-2 cursor-pointer"
                    onClick={() => handleDeleteNote(note._id)}
                  ></i>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default NotesItem;
