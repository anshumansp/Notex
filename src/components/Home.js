import React, { useState, useContext } from 'react'
import {
  Card,
  Input,
  Button,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import NotesItem from './NotesItem';
import NoteContext from "../context/noteContext";


function Home(props) {

  const { newAlert } = props;
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [titleText, setTitleText] = useState("");
  const [descText, setDescText] = useState("");

  const onTitleChange = (e) => {
    setTitleText(e.target.value);
  }
  
  const onDescChange = (e) => {
    setDescText(e.target.value);
  }
  
  const onClick = async (e) => {
    e.preventDefault();
    setTitleText("");
    setDescText("");
    const title = titleText;
    const description = descText;
    const note = {
      title: title,
      description: description,
    };
    const response = await addNote(note);
    newAlert(response.message, response.status);
  };

  return (
    <div className="flex justify-center mx-auto w-3/4 ">
      <div className="mt-4 mx-auto w-full flex flex-col justify-center">
        <Card
          color="transparent"
          shadow={false}
          className="flex justify-center w-auto "
        >
          <Typography
            variant="h3"
            color="black"
            style={{ fontFamily: "initial" }}
          >
            Create Your Notes
          </Typography>
          <form className="mt-4 mb-2 w-full sm:w-full">
            <div className="mb-4 flex flex-col gap-4">
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: "600",
                  fontFamily: "math",
                  color: "black",
                }}
              >
                Title
              </h2>
              <Input
                style={{ borderColor: "black" }}
                size="lg"
                id="title"
                className="placeholder:text-secondary outline-none border-black "
                placeholder="Enter a Title"
                onChange={onTitleChange}
                value={titleText}
              />
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  fontFamily: "math",
                  color: "black",
                }}
              >
                Description
              </h2>
              <Textarea
                className="placeholder:text-secondary outline-none border-black"
                id="description"
                style={{
                  height: "100px",
                  borderColor: "black",
                  borderRadius: "8px",
                }}
                placeholder="Enter a Description"
                onChange={onDescChange}
                value={descText}
              />
            </div>
            <Button className="mt-6" onClick={onClick} fullWidth>
              Add Note
            </Button>
          </form>
        </Card>
        <NotesItem newAlert={newAlert} />
      </div>
    </div>
  );
}

export default Home;
