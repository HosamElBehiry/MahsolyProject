const mongoose = require("mongoose");
const AgricultureCropsSchema = mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Crops",
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  images: {
    type: String,
    default: "",
  },
  locationLongitude: {
    type: String,
    required: true,
  },
  locationLatitude: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
    required: true,
  },
  quantityId: {
    type: Number,
    min: 1,
    max: 6,
  },
  comments : {
    type : [mongoose.Schema.Types.ObjectId],
    ref : 'Comments'
  },
  Owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref : "User"
  }
}, {timestamps: true});

module.exports = mongoose.model("AgricultureCrops", AgricultureCropsSchema);
