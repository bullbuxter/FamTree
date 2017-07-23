var mongoose = require('mongoose'),
    config = require('../config/database'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var schema = new Schema({
  name: {
    fName: {type: String, required: true},
    lName: {type: String, required: true}
  },
  family: {type: ObjectId, ref: "Family", required: true},
  gender: {type: Number, min: 1, max: 2, required: true},
  father: {type: ObjectId, ref: "FamilyMember"},
  mother: {type: ObjectId, ref: "FamilyMember"},
  spouse: {type: ObjectId, ref: "FamilyMember"},
  children: [{type: ObjectId, ref: "FamilyMember"}],
  dob: {type: Date, required: true}
}, {timestamps: true});

var FamilyMember = module.exports = mongoose.model("FamilyMember", schema);
