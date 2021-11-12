const mongoose = require("mongoose");
const ArticleSchema = mongoose.Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  },
  name: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  images: {
    type: Array,
    default: [],
  },
  title: {
    type: String,
    default: "",
  },
  likes: {
    type: [Number],
    default : [0]
  },
  comments: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Articles", ArticleSchema);