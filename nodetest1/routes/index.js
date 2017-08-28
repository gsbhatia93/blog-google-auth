var express = require('express');
var router = express.Router();
var url = require('url');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res, next) {
    res.render('helloworld', { title: 'Hello, World!' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {   // which page to render
            "userlist" : docs
        });
    });
});

/* GET new user page */
router.get('/newuser',function(req,res){
  res.render('newuser',{title:'Add New User'}); // newuser.jade
});
/* POST add new user */
router.post('/adduser',function(req,res){
    //internal db connection
    var db = req.db;
    // username and email
    var userName = req.body.username;
    var userEmail = req.body.userEmail;
    var collection = db.get('usercollection');
    collection.insert(
      {
      "username":userName,
      "useremail":userEmail
    },function(err,doc){
      if(err){
        res.send("there was some problem in sending error");
      }
      else{
        res.redirect('userlist')
      }

    });
});

/* GET  blog page*/
router.get('/blog',function(req,res){
  res.render('blog',{title:'blog'});
});

/* POST add blog submit*/
router.post('/saveblog',function(req,res){
  var title=req.body.title;
  var body=req.body.body;
  var created_at = new Date();
  var comments = {
      username:"jaspreet",
      comments:"do something with your life",
      created_at:new Date()
  };
  var db = req.db;
  var collection = db.get('blog');
  collection.insert({
    'title':title,
    'body':body,
    'comments':comments,
    'created_at':created_at
  },function(err,doc){
      if(err){
        console.log("cant add blog,some error");
        res.send("error in adding blog to db");
        res.redirect('/helloworld');
      }
      else{
        console.log("adding blog");
      }
  });
  res.redirect('/displayallblogs');
});
/*GET display all blogs */
router.get('/displayallblogs', function(req, res) {
    var db = req.db;
    var collection = db.get('blog');
    collection.find({},{},function(e,docs){
        res.render('displayallblogs', {   // which page to render
            "bloglist" : docs
        });
    });
});

/*GET display all blogs */
router.get('/displayblog',function(req,res){
  var url_parts = url.parse(req.url,true);
  //console.log(url_parts);
  var query = url_parts.query;
  var id  = query.id;
  var ObjectId = require('mongodb').ObjectId;
  var o_id = new ObjectId(id);
  var db = req.db;
  var collection = db.get('blog');
  collection.findOne({'_id': o_id}, function(err, result) {
    if(err){
    console.log("---err----")
    }
    else{
        console.log(result.comments);
        res.render('displayblog',{blog:result});
    }
  });
  // collection.find(o_id,function(e,blog){
  //     if(e){
  //       console.log("error in sending")
  //       res.send("err");
  //     }
  //     else{
  //     console.log(blog.title);
  //     res.render('displayblog',{blog:blog});
  //   }
  // });

});

module.exports = router;
