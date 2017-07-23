var express = require('express'),
    router = express.Router(),
    User = require("../models/user");

router.get("/", function(req, res) {
  User.find({}, function(err, users) {
    if(err) throw err;
    res.json(users);
  });
});

router.get('/new', function(req, res, next) {
  let user = new User({
    name: "Akash Ballal C"
  });
  user.save(function(err, user) {
    if(err) throw err;
    res.json({success: true, msg: "Successfully added a new user " + user.name + "."});
  });
});

module.exports = router;
