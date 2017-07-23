var express = require('express'),
    router = express.Router(),
    Family = require('../models/family'),
    User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { name: 'Akash Ballal C' });
});

router.get('/link', function(req, res, next) {
  Family.findOne({name: "Ballal"}, "_id", function(err, family) {
    if(err) throw err;
    User.findOne({name: "Akash Ballal C"}, function(err, user) {
      if(err) throw err;
      user.created_families.push(family._id);
      family.created_by = user._id;
      user.save();
      family.save();
    });
  });
});

router.get("/families", function(req, res) {
  Family.find({}, function(err, families) {
    if(err) throw err;
    res.json(families);
  });
});

module.exports = router;
