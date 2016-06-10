var express = require('express');
var User = require('../models/user');
var Pup = require('../models/pup');
var router = express.Router();


router.route('/')
  .get(function(req, res) {
    Pup.find(function(err, pups) {
      console.log(err)
      if (err) return res.status(500).send(err);
      res.send(pups);
    });
  })
  .post(function(req, res) {
    User.findOne({_id:req.user._doc._id}, function(err, user){
      Pup.create(req.body, function(err, pup) {
        if (err) return res.status(500).send(err);
        user.pup = pup;
        user.save();
        res.send(pup);
      }); 
    })
  });


router.get('/unmatched', function(req, res){
  User.findById(req.query.id).populate('pup').exec(function(err, user){
    var exclude = [user.pup._id];
    console.log(exclude);
    console.log(user.pup.match);
    exclude = exclude.concat(user.pup.left, user.pup.match);
    console.log(exclude);
    Pup.find({_id: {$nin: exclude}}).populate('match').exec(function(err, pups){
      res.send(pups);
    })
  })
  
})

router.route('/:id')
  .get(function(req, res) {
    Pup.findById(req.params.id, function(err, pup) {
      if (err) return res.status(500).send(err);
      res.send(pup);
    });
  })
  .put(function(req, res) {
    Pup.findByIdAndUpdate(req.params.id, req.body, function(err) {
      if (err) return res.status(500).send(err);
      res.send({'message': 'success'});
    });
  })
  .delete(function(req, res) {
    Pup.findByIdAndRemove(req.params.id, function(err) {
      if (err) return res.status(500).send(err);
      res.send({'message': 'success'});
    });
  });

// logic below for the router for matching, first find user_id  then creating a match
router.route('/match') 
  .post(function(req, res){
    User.findById(req.body.currentUserId, function(err, user) {
      if(user) {
        console.log('Incoming Pup: ', req.body.pup);
        Pup.update({_id: user.pup}, {$push: {match: req.body.pup}}, function(err, pup) {
          console.log('Error: ', err);
          console.log('New pup added: ', pup);
        });
      }
    })
    // Pup.findByIdAndUpdate(req.params.id, function(err, pup){
    //   if(err) return res.status(500).send(err);
    //   res.send({})

    // // User.findOne({_id:req.user._doc._id}, function(err, user)
    // // Match.create(req.body, function(err, pup)  
    // });
  });


module.exports = router;
