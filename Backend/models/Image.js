const mongoose = require("mongoose");
const { Schema } = mongoose;

const ImageSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  filename: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Image = mongoose.model("image", ImageSchema);
module.exports = Image;
