import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Pagination from "@mui/material/Pagination";
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import "./Homecomponents.css";

export default function HomePage() {

  // use state variable to handle images
  const [images, setImages] = useState([]);

  // variable of images per page
  const imagesPerPage = 10;

  // use state variable to handle pagination
  const [currentPage, setCurrentPage] = useState(1);

  // use state variable to handle selection of image on click for zooming
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // fetching image from assets
  useEffect(() => {
    const loadImages = async () => {
      const importedImages = await Promise.all(
        Array.from({ length: 33 }, (_, index) =>
        import(`/src/Assets/SampleImage${index + 1}.jpg`)
        )
        );

      setImages(importedImages);

    };

    loadImages();
  }, []);
 
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // logic to handle pagination and images per page as well as number of pages
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  // function to handle change of page through pagination
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Box className="image-container">
        <ImageList variant="masonry" cols={2} gap={8}>
          {currentImages.map((image, index) => (
            <ImageListItem key={index} onClick={() => handleImageClick(image)}>
              <img
                key={index}
                className="images"
                src={image.default}
                alt={`SampleImage${index + 1}`}
              />
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
              <img src={selectedImage.default} alt="Selected" style={{ width: '100%', maxHeight: '60vh', objectFit: 'contain' }} />
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleCloseModal}
                aria-label="close"
                style={{ position: 'absolute', top: 5, right: 5 }}
              >
                <CloseIcon style={{ fontSize: 40, backgroundColor: "#fff", borderRadius: 50 }} />
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
    </>
  );
}
