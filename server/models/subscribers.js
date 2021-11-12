const mongoose = require('mongoose');
const SubscriberSchema = mongoose.Schema({
  email : {
    type: String,
    required : true
  }
})

module.exports = mongoose.model("Subscribers", SubscriberSchema);
