var mongoose = require('mongoose');

var PupSchema = new mongoose.Schema({
  name: String,
  bio: String,
  image: String,
  // left: [{type: mongoose.Schema.Types.ObjectId,  ref:'Pup'}],
  // right: [{type: mongoose.Schema.Types.ObjectId, ref:'Pup'}],
  // match: [{tyope: mongoose.Schema.Types.ObjectId, ref:'Pup'}]
});

module.exports = mongoose.model('Pup', PupSchema);
