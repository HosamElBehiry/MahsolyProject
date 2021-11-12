const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  location: {
    type: String,
  },
  image: {
    type: String,
    default: "",
  },
  favourites: {
    type: Array,
    default: [],
  },
  AgricultureCrop : {
    type : [mongoose.Schema.Types.ObjectId],
    ref : "AgricultureCrops",
    default : []
  },
  AgricultureLand : {
    type : [mongoose.Schema.Types.ObjectId],
    ref : "AgricultureLand",
    default : []
  },
  Articles : {
    type : [mongoose.Schema.Types.ObjectId],
    ref : "Articles",
    default : []
  },
  comments: {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Comments"
  }
});

module.exports = mongoose.model("User", userSchema);
