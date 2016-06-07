var express = require('express');
var Pup = require('../models/pup');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    Pup.find(function(err, pups) {
      if (err) return res.status(500).send(err);
      res.send(pups);
    });
  })
  .post(function(req, res) {
    Pup.create(req.body, function(err, pup) {
      if (err) return res.status(500).send(err);
      res.send(pup);
    });
  });

router.route('/:id')
  .get(function(req, res) {
    Pup.findById(req.params.id, function(err, recipe) {
      if (err) return res.status(500).send(err);
      res.send(recipe);
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

module.exports = router;
