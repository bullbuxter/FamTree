var mongoose = require('mongoose'),
    config = require('../config/database'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var schema = new Schema({
  name: {type: String, required: true},
  origin: {type: String, required: true},
  createdBy: {type: ObjectId, ref: "User", required: true}
}, {timestamps: true});

var Family = module.exports = mongoose.model("Family", schema);
