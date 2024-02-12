import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import notify from "../Notify Components/Notification";
import FetchImages from "./FetchImages";
import { useLoadingBar } from "../../context/LoadingBarContext";

function MyImages() {
  const navigate = useNavigate();
  const { setProgress } = useLoadingBar();

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  axios.defaults.withCredentials = true;

  // function called when the user click the upload image button
  const handleFileChange = async (event) => {

    // select file through local storage
    const selectedFile = event.target.files[0];
    setProgress(20);

    // block of code executed if the user select any file
    if (selectedFile) {
      try {
        setProgress(40);

        // create a new FormData object and add the selected file in the formdata
        const formData = new FormData();
        formData.append("image", selectedFile);

        // headers of the API call
        const headers = {
          "Content-Type": "application/x-www-form-urlencoded",
          "auth-token": localStorage.getItem("authToken"),
        };

        // API url, Base url is fetching from the .env file
        const API_URL = `${process.env.REACT_APP_Backend_URL}api/image/upload`;
        setProgress(60);

        // API call
        axios.post(API_URL, formData, { headers }).then((res) => {
          setProgress(80);

          // navigate to the /MyImages endpoint on successfull completion of request
          navigate("/MyImages");
          setProgress(100);

          // notify user that image is uploaded
          notify("Image uploaded successfully", "success");
        });
      } catch (err) {

        // notify the user with error message
        notify("Something went wrong", "error");
        setProgress(100);
      }
    }
  };

  return (
    <>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{ mt: 2, ml: 2 }}
        >
          Upload Image
          <VisuallyHiddenInput
            type="file"
            id="fileInput"
            onChange={handleFileChange}
          />
        </Button>
      <FetchImages />
    </>
  );
}

export default MyImages;
