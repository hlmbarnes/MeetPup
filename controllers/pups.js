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
  .put(function(req, res){
    // Pup.findByIdAndUpdate
    Pup.findByIdAndUpdate(req.params.id, function(err, pup){
      if(err) return res.status(500).send(err);
      res.send({})

    // User.findOne({_id:req.user._doc._id}, function(err, user)
    // Match.create(req.body, function(err, pup)  
    });
  });

module.exports = router;
