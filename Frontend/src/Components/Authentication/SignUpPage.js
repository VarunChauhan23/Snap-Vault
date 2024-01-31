import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import notify from "../Notify Components/Notification";
import "./Authentication.css";
import { useLoadingBar } from "../../context/LoadingBarContext";

function SignUpPage() {

  // navigate function to navigate after completing an operation
  const navigate = useNavigate();
  const { setProgress } = useLoadingBar();

  // use state variable to handle visibility of password at input textfield
  const [showPassword, setShowPassword] = useState(false);

  // use state variable to handle email inpt
  const [email, setEmail] = useState("");

  // use state variable to check if the email entered is valid or not
  const [emailError, setEmailError] = useState("");

  // use state variable to handle remaining credentials
  const [credentials, setCredentials] = useState({
    name: "",
    password: "",
  });

  // handleSubmit function runs when the signup form is submitted
  const handleSubmit = async (e) => {

    // prevent the default functionality of submit to prevent page loading
    e.preventDefault();
    setProgress(20);

    // Data which need to transferred in the request body of API call
    const postData = {
      name: credentials.name,
      email: email,
      password: credentials.password,
    };

    // headers of the API call
    const headers = {
      "Content-Type": "application/json",
    };

    // API url, Base url is fetching from the .env file
    const API_URL = `${process.env.REACT_APP_Authentication_Base_URL}/CreateUser`;

    setProgress(50);

    // API (POST) call to the /CreateUser endpoint
    axios
      .post(API_URL, postData, { headers })
      .then((res) => {
        setProgress(80);

        // navigate to the /verifyEmail/:userId endpoint on successfull completion of request and the res.data.userId is the Mongo Db id of the user.
        navigate(`/verifyEmail/${res.data.userId}`);
        setProgress(100);

        // notify with a toast to enter OTP to the user.
        notify("Enter OTP to finish signing up", "success");
      })
      .catch((err) => {

        // notify the user with error message
        notify("Something went wrong", "error");
        // notify("Some error occured. Please try again later.", "error");
        setProgress(100);
      });
  };

  // function to handle the visibility of the password while input it.
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // function called when the values are entered in the input textfield
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // function to handle the change of email input text field
  const handleEmailChange = (e) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);

    // Email validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(enteredEmail);

    // Set error message and disable button if email is not valid
    setEmailError(isValidEmail ? "" : "Invalid email address");
  };

  return (
    <Container id="main-container">
      <Form id="main-form" onSubmit={handleSubmit}>
        <Container className="info-container" id="name-container">
          <Form.Group className="mb-3">
            <TextField
              fullWidth
              required
              value={credentials.name}
              onChange={onChange}
              name="name"
              id="outlined-required fullWidth name"
              label="Name"
              placeholder="Your Full Name"
            />
          </Form.Group>
        </Container>
        <Container className="info-container" id="email-container">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <TextField
              fullWidth
              required
              value={email}
              onChange={handleEmailChange}
              error={Boolean(emailError)}
              helperText={emailError}
              name="email"
              id="outlined-required fullWidth email"
              label="Email"
              placeholder="Your Gmail"
            />
          </Form.Group>
        </Container>
        <Container className="info-container" id="password-container">
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              value={credentials.password}
              onChange={onChange}
              name="password"
            />
          </FormControl>
        </Container>
        <Container className="info-container" id="password-info">
          <p>Password must be at least 8 characters long.</p>
        </Container>
        <Container className="info-container" id="button-container">
          <Button
            variant="contained"
            type="submit"
            disabled={credentials.password.length < 8}
          >
            Send OTP
          </Button>
        </Container>
        <Container className="info-container" id="login-info-container">
          <p>Already have an account <Link to="/login" id="links">Login Here</Link></p>
        </Container>
      </Form>
    </Container>
  );
}

export default SignUpPage;
