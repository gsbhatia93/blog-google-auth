var mongoose = require('mongoose');
var User     = require('./user');

var commentSchema  = mongoose.Schema({
  user : [User.schema],
  body : String,
  createdOn : Date
});

module.exports = mongoose.model('Comment', commentSchema);
