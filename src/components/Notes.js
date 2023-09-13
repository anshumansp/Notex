import React, { useState } from "react";
import {
  Card,
  Input,
  Button,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import NotesItem from './NotesItem';

function Notes() {
  const [description, setDescription] = useState("");

  const handleTextareaChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTextareaKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const { selectionStart, selectionEnd } = event.target;
      const newDescription =
        description.substring(0, selectionStart) +
        "\n" +
        description.substring(selectionEnd);

      setDescription(newDescription);
    }
  };

  return (
    <div className="my-4 mx-auto w-full flex flex-col justify-center">
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
                fontWeight: "500",
                fontFamily: "initial",
              }}
            >
              Title
            </h2>
            <Input
              style={{ borderColor: "black" }}
              size="lg"
              className="text-black outline-none border-black "
              placeholder="Enter a Title"
            />
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "500",
                fontFamily: "initial",
              }}
            >
              Description
            </h2>
            <Textarea
              className="outline-none border-black"
              style={{
                height: "100px",
                borderColor: "black",
                borderRadius: "8px",
              }}
              value={description}
              onChange={handleTextareaChange}
              onKeyDown={handleTextareaKeyDown}
            />
          </div>
          <Button className="mt-6" fullWidth>
            Add Note
          </Button>
        </form>
      </Card>
      <NotesItem />
    </div>
  );
}

export default Notes;
