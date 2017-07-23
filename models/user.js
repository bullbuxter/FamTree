var mongoose = require('mongoose'),
    config = require('../config/database'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var schema = new Schema({
  name: {type: String, required: true},
  createdFamilies: [{type: ObjectId, ref: "Family"}],
}, {timestamps: true});

var User = module.exports = mongoose.model("User", schema);
