const mongoose = require("mongoose");
const Crops = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  /* =========== 1 refer to vegtables ========*/
  /* =========== 2 refer to fruits========*/
  /* =========== 3 refer to others ========*/
  typeId: {
    type: Number,
    min: 1,
    max: 3,
    required: true,
  },
  img: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stars: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  }
});

module.exports = mongoose.model("Crops", Crops);
