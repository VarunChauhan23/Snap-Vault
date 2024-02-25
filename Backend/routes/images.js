const express = require("express");
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Image = require("../models/Image");
const fetchuser = require("../middleware/fetchuser");
const cors = require('cors');

const corsOptions = {
  origin: 'https://snap-vault.vercel.app', //Or your frontend running URL
  methods: 'GET,POST,DELETE',
  withCredentials: false
};

// Route 1 --> Upload image using POST: at /api/image/upload. Login required
router.post("/upload", upload.single("image"), fetchuser, cors(corsOptions), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create a new image document in MongoDb
    const newImage = await Image.create({
      user: req.user.id,
      filename: req.file.originalname,
      cloudinaryId: result.public_id,
      url: result.secure_url,
    });

    res.send(newImage);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Something went wrong! Please try after some time" });
  }
});

// Route 2 --> Fetch image using GET: at /api/image/fetchImage. Login required
router.get("/fetchImage", fetchuser, cors(corsOptions), async (req, res) => {
  try {
    // Find images of that user
    const image = await Image.find({ user: req.user.id });
    res.send(image);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Something went wrong! Please try after some time" });
  }
});

// Route 3 --> Delete an existing image using DELETE: at /api/image/deleteImage. Login required
router.delete("/deleteImage/:id", fetchuser, cors(corsOptions), async (req, res) => {

  const imageId = req.params.id;

  try {

    // Find the image to be deleted.
    let image = await Image.findById(imageId);
    
    // If image doesn't exists, return bad request and error message
    if (!image) {
      return res.status(400).send('Not Found');
    }

    // Check if the image is belong to the user or not
    if (image.user.toString() !== req.user.id) {
      return res.status(401).send('Not allowed');
    }

    // Delete the image from Cloudinary using its public_id
    await cloudinary.uploader.destroy(image.cloudinaryId);

    // Delete the image from Mongo Db using its objectId
    await Image.findByIdAndDelete(imageId);

    res.send('Image deleted successfully');
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Something went wrong! Please try after some time" });
  }
});

module.exports = router;
