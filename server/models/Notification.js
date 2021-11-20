const mongoose = require('mongoose');
const Notification = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  description : {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("Notification", Notification);