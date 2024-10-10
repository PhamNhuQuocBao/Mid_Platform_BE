const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: false,
    required: true,
  },
  image: {
    type: String,
    required: false,
    default: "",
  },
});

module.exports = mongoose.model("Product", productSchema);
