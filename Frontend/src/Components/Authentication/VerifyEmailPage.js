import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Authentication.css";
import notify from "../Notify Components/Notification";
import { useLoadingBar } from "../../context/LoadingBarContext";

function VerifyEmailPage() {

  // navigate function to navigate after completing an operation
  const navigate = useNavigate();
  const { setProgress } = useLoadingBar();

  // fetching Mongo Id of user from the header using useParams hook
    const { userId } = useParams();

    // useState variable to handle the otp values
    const [otp, setOtp] = useState("");

    // function called when the verifyEmail form is submitted
    const handleSubmit = async (e) => {

        setProgress(20);

        // converting otp value to int datatype
        const OTP_Value = parseInt(otp, 10);

        e.preventDefault();

        // Data which need to transferred in the request body of API call
        const postData = {
          otp: OTP_Value
        };
    
        // headers of the API call
        const headers = {
          "Content-Type": "application/json",
        };
    
        // API url, Base url is fetching from the .env file
        const API_URL = `${process.env.REACT_APP_Authentication_Base_URL}/verifyEmail/${userId}`

        setProgress(50);

        // API (POST) call to the /CreateUser endpoint
        axios.post( API_URL, postData, { headers } )
          .then(res => {
            setProgress(80);

            // navigate to the /login endpoint on successfull completion of request.
             navigate('/login');
             setProgress(100);

            //  notify user about successfull completion of email verification
             notify("Email verified successfully", "success");
            })
          .catch((err) => {

            // notify the user with error message
            notify("Something went wrong", "error");
            // notify("An error occured", "error");
            setProgress(100);
          });
      };

      // function called when the user enters value in otp textfield
      const onChange = (e) => {
        const value = e.target.value;

        // logic to allow only six digits in textfield
        const sanitizedValue = value.replace(/\D/g, '').slice(0, 6);

        setOtp(sanitizedValue);
      };

  return (
    <Container id="main-container">
      <Form id="main-form" onSubmit={handleSubmit}>
        <Container className="info-container">
          <h3>An OTP has been sent to your provided email. Please enter the OTP below to continue.</h3>
        </Container>
        <Container className="info-container" id="email-container">
          <Form.Group className="mb-3" controlId="text">
            <TextField
              fullWidth
              required
              value={otp}
              onChange={onChange}
              inputProps={{
                maxLength: 6,
                pattern: '[0-9]{6}',
              }}
              name="otp"
              id="outlined-required fullWidth"
              label="OTP"
              placeholder="Enter OTP sent to your email"
            />
          </Form.Group>
        </Container>
        <Container className="info-container" id="button-container">
          <Button variant="contained" type="submit" disabled={otp.length < 6 || otp.length > 6}>Sign Up</Button>
        </Container>
      </Form>
    </Container>
  );
}

export default VerifyEmailPage;
