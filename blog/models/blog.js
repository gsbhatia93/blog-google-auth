var mongoose = require('mongoose');
var User     = require('./user');

var Comment  = require('./comment')
var blogSchema   = mongoose.Schema({
    user  :  [User.schema],
    title :  "String",
    body  :  'String',
    comments:[Comment.schema],
    createdOn:Date
});
module.exports = mongoose.model('Blog', blogSchema);
