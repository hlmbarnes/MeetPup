var express = require('express');
var User = require('../models/user');
var router = express.Router();
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var secret = "mysupersecretpassword";


router.route('/')
  .get(function(req, res) {
    User.find(function(err, users) {
      if (err) return res.status(500).send(err);
      res.send(users);
    });
  })
  .post(function(req, res) {
    User.findOne({email:req.body.email},function(err, exists){
      if(err) return res.status(500).send(err);
      if(exists) return res.status(401).send("user exists")
      User.create(req.body, function(err, user) {
        console.log(user)
        if (err) return res.status(500).send(err);

        var token = jwt.sign(user, secret);
        res.send({user: user, token: token});
      });
    })
  });

router.get('/:id', function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) return res.status(500).send(err);
    res.send(user);
  });
});

module.exports = router;
