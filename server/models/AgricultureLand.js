const mongoose = require("mongoose");
const landSchema = mongoose.Schema({
    description: {
      type: String,
      required:true,
    },
    area: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: ""
    },
    longitude: {
      type: Number,
      required : true
    },
    latitude: {
      type: Number,
      required : true
    },
    type: {
      type: Number,
      min : 1,
      max : 6,
      required : true
    },
    price: {
      type: Number,
      default : 0
    },
    measurement: {
      type: Number,
      min : 1,
      max : 3,
      required : true
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
module.exports = mongoose.model('AgricultureLand' , landSchema)