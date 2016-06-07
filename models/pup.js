var mongoose = require('mongoose');

var PupSchema = new mongoose.Schema({
  name: String,
  bio: String,
  image: String
});

module.exports = mongoose.model('Pup', PupSchema);
