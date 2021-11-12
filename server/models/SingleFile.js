const mongoose = require('mongoose');
const singleFileSchema = mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  fileSize: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('SingleFile', singleFileSchema);