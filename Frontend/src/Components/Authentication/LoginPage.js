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
import "./Authentication.css";
import notify from "../Notify Components/Notification";
import { useLoadingBar } from "../../context/LoadingBarContext";

function LoginPage() {
  const navigate = useNavigate();
  const { setProgress } = useLoadingBar();

  // use state variable to handle credentials
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  // use state variable to handle visibility of password at input textfield
  const [showPassword, setShowPassword] = useState(false);

  axios.defaults.withCredentials = true;

  // handleSubmit function runs when the login form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(20);

    // Data which need to transferred in the request body of API call
    const postData = {
      email: credentials.email,
      password: credentials.password,
    };

    // headers of the API call
    const headers = {
      "Content-Type": "application/json",
    };

    // API url, Base url is fetching from the .env file
    const API_URL = `${process.env.REACT_APP_Backend_URL}api/auth/login`;

    setProgress(50);

    // API (POST) call to the /login endpoint
    axios
      .post(API_URL, postData, { headers })
      .then((res) => {
        setProgress(80);

        // fetching auth-token from the data and saving it in the local storage
        const authToken = res.data.authtoken;
        localStorage.setItem("authToken", authToken);

        // navigate to the /MyImages endpoint on successfull completion of request
        navigate('/MyImages');
        setProgress(100);

        // notify with a toast to the user.
        notify("Login Successfully", "success");
      })
      .catch((err) => {

        // notify the user with error message
        notify("Invalid Credentials", "error");
        setProgress(100);
      });
  };

  // function to handle the visibility of the password while input it.
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // function called when the values are entered in the input textfield
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <Container id="main-container">
      <Form id="main-form" onSubmit={handleSubmit}>
        <Container className="info-container" id="email-container">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <TextField
              fullWidth
              required
              value={credentials.email}
              onChange={onChange}
              name="email"
              id="outlined-required fullWidth"
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
        <Container className="info-container" id="button-container">
          <Button variant="contained" type="submit" disabled={credentials.password.length < 8}>
            Login
          </Button>
        </Container>
        <Container className="info-container" id="button-container">
          <p>Donn't have an account connect with us. <Link to="/SignUp" id="links">Sign Up Here</Link></p>
        </Container>
      </Form>
    </Container>
  );
}

export default LoginPage;
