import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import notify from "../Notify Components/Notification";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Pagination from "@mui/material/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useLoadingBar } from "../../context/LoadingBarContext";
import Button from "@mui/material/Button";
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const FetchImages = () => {
  const navigate = useNavigate();
  const { setProgress } = useLoadingBar();

  //    use state variable to handle images and pagination
  const [images, setImages] = useState([]);
  const imagesPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  //   use state variable to handle hovering on the images
  const [hoveredImage, setHoveredImage] = useState(null);

  // use state variable to handle selection of image on click for zooming
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  //   function to handle the fetching of images
  const handleImageFetching = () => {
    setProgress(20);

    try {
      // headers of the API call
      const headers = {
        "auth-token": localStorage.getItem("authToken"),
      };

      // API url, Base url is fetching from the .env file
      const API_URL = `${process.env.REACT_APP_Image_Base_URL}/fetchImage`;

      setProgress(60);

      //   API call
      axios.get(API_URL, { headers }).then((res) => {
        // set images in the use state variable
        setImages(res.data);
        setProgress(100);
      });
    } catch (err) {
      // notify the user with error message
      notify(err, "error");
      notify("Some error occured. Please try again later.", "error");
      setProgress(100);
    }
  };

  //   useeffect to call fetching image function and if the user is not logged in the redirect to login page
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
    } else {
      handleImageFetching();
    }
    // eslint-disable-next-line
  }, []);

  // function to select an image to zoom it
  const handleImageClick = (image) => {
    setSelectedImage(image.url);
  };

  //   function to handle page change
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  //   logic to handle images and pagination
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  //   function to delete images
  const handleImageDelete = async (imageId) => {
    setProgress(20);
    try {
      const headers = {
        "auth-token": localStorage.getItem("authToken"),
      };

      const API_URL = `${process.env.REACT_APP_Image_Base_URL}/deleteImage/${imageId}`;

      setProgress(60);

      axios.delete(API_URL, { headers }).then((res) => {
        setProgress(80);
        navigate("/MyImages");
        setProgress(100);
        notify("Image deleted successfully", "success");
      });
    } catch (err) {
      // notify the user with error message
      notify("Something went wrong", "error");
      // notify("Some error occurred. Please try again later.", "error");
      setProgress(100);
    }
  };

  return (
    <>
      {localStorage.getItem("authToken") && (
        <Box className="image-container">
          <ImageList variant="masonry" cols={2} gap={8}>
            {currentImages.map((image, index) => (
              <ImageListItem
                key={index}
                onMouseEnter={() => setHoveredImage(index)}
                onMouseLeave={() => setHoveredImage(null)}
                onClick={() => handleImageClick(image)}
              >
                <img
                  key={index}
                  className="images"
                  src={image.url}
                  alt={`UserImage${index + 1}`}
                />
                {hoveredImage === index && (
                  <div className="image-overlay">
                    <Button
                      size="small"
                      color="secondary"
                      startIcon={<FontAwesomeIcon icon={faTrashAlt} />}
                      onClick={() => handleImageDelete(image._id)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </ImageListItem>
            ))}
          </ImageList>
          <Modal open={!!selectedImage} onClose={handleCloseModal}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              {selectedImage && (
                <>
                  <img
                    src={selectedImage}
                    alt="Selected"
                    style={{
                      width: "100%",
                      maxHeight: "60vh",
                      objectFit: "contain",
                    }}
                  />
                  <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handleCloseModal}
                    aria-label="close"
                    style={{ position: "absolute", top: 5, right: 5 }}
                  >
                    <CloseIcon
                      style={{
                        fontSize: 40,
                        backgroundColor: "#fff",
                        borderRadius: 50,
                      }}
                    />
                  </IconButton>
                </>
              )}
            </Box>
          </Modal>
          <Pagination
            count={Math.ceil(images.length / imagesPerPage)}
            page={currentPage}
            onChange={handleChangePage}
            color="secondary"
            sx={{
              mt: 4,
              mb: 2,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          />
        </Box>
      )}
      {!localStorage.getItem("authToken") && (
        <h1>Please add Some images to view here.</h1>
      )}
    </>
  );
};

export default FetchImages;
