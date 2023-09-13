import { useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  //   Checkbox,
  Button,
} from "@material-tailwind/react";
import backgroundImage from "./nature.webp";
const API_URL = process.env.REACT_APP_BACK_URL;

export function Signup(props) {
  const { newAlert } = props;
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const background = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const user = {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
    };

    const response = await fetch(`${API_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    const token = data.token;
    localStorage.setItem("jwt", token);

    if (data.status === "Success") {
      window.location.href = "/";
    } else {
      newAlert("Signup failed", "Error");
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={background}
    >
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Signup
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            type="text"
            name="name"
            value={credentials.name}
            onChange={handleChange}
            placeholder="Enter your Name"
            size="lg"
          />
          <Input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="Enter your Email"
            size="lg"
          />
          <Input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Enter your Password"
            size="lg"
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth onClick={handleSignup}>
            Sign Up
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Already have an account?
            <Typography
              as="a"
              href="/login"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Login
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Signup;
