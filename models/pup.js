var mongoose = require('mongoose');

var MatchSchema = new mongoose.Schema({

});

var PupSchema = new mongoose.Schema({
  name: String,
  bio: String,
  image: String,
  left: [{type: mongoose.Schema.Types.ObjectId,  ref:'Pup'}],
  right: [{type: mongoose.Schema.Types.ObjectId, ref:'Pup'}],
  match: []
});

module.exports = mongoose.model('Pup', PupSchema);
