var express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router(),
    Family = require('../models/family'),
    User = require('../models/user'),
    FamilyMember = require('../models/familyMember'),
    multer = require("multer"),
    upload = multer({dest: "./public/family_members/"}),
    fs = require("fs"),
    path = require("path");
/* GET home page. */
router.get("/:id/members", function(req, res) {
  FamilyMember.find({family: req.params.id}, function(err, members) {
    if(err) throw err;
    res.json(members);
  });
});

router.get('/new', function(req, res) {
  User.findOne({name: "Akash Ballal C"}, function(err, user) {
    if(err) throw err;
    var family = new Family({
      name: "Ballal",
      origin: "Udupi",
      createdBy: user._id
    });
    family.save(function(err, family) {
      if(err) throw err;
      user.createdFamilies.push(family._id);
      user.save();
      res.json({
        success: true,
        msg: "Successfully added a new family " + family.name + "."
      });
    });
  });
});
router.post("/member/new", function(req, res) {
  req.body.gender = parseInt(req.body.gender);
  // if(req.body.gender != 1 || req.body.gender != 2) {
  //   return res.status(400).send("Invalid form data.");
  // }
  var member = new FamilyMember({
    name: req.body.name,
    family:  mongoose.Types.ObjectId(req.body.family),
    gender: parseInt(req.body.gender),
    dob: new Date(req.body.dob)
  });

  if(req.body.father !== undefined) {
    member.father = mongoose.Types.ObjectId(req.body.father);
  }
  if(req.body.spouse !== undefined) {
    member.spouse = mongoose.Types.ObjectId(req.body.spouse);
  }
  if(req.body.children !== undefined) {
    req.body.children.forEach(function(child) {
      member.children.push(mongoose.Types.ObjectId(child));
    });
  }
  member.save(function(err, member) {
    if(err) throw err;
    res.json({success: true, member_id: member._id});
  });
});
router.post("/member/photo", upload.single("photo"), function(req, res) {
  // Storing the member photo.
  let filepath = req.file.destination + req.body.member_id + ".png";
  fs.rename(req.file.path, filepath, function(err) {
    if(err)
      return res.status(400).send("Server error.");
    res.json({success: true});
  });
});
module.exports = router;
