import { useContext } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import NoteContext from "../context/noteContext";

function MessageDialog(props) {
  const { newAlert } = props;
  const context = useContext(NoteContext);
  const { open, handleOpen, dialogNote, setDialogNote, saveNote } = context;

  const handleChange = (e) => {
    setDialogNote({ ...dialogNote, [e.target.name]: e.target.value });
  };

  const handleSaveNote = async (id) => {
    const response = await saveNote(id);
    newAlert(response.message, response.status);
  };

  return (
    <div>
      <Dialog open={open} handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader>Edit Note</DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={handleOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody divider>
          <div className="grid gap-6">
            <Input
              placeholder="Enter a new Title"
              name="title"
              value={dialogNote.title}
              onChange={handleChange}
            />
            <Textarea
              placeholder="Enter a new Description"
              name="description"
              value={dialogNote.description}
              onChange={handleChange}
            />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="red" onClick={handleOpen}>
            close
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => handleSaveNote(dialogNote.id)}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default MessageDialog;
