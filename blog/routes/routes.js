//  /routes/routes.js
var url = require('url');
var Blog = require('../models/blog');
var Comment = require('../models/comment');

module.exports = function(app,passport){

    // home page
      app.get('/', function(req, res) {
            res.render('index.ejs'); // load the index.ejs file
        });
        // show the login form
        app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
        });
    // show the signup form
        app.get('/signup', function(req, res) {

            // render the page and pass in any flash data if it exists
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });
        app.get('/profile', isLoggedIn, function(req, res) {
                console.log(req.user);
                res.render('profile.ejs', {
                    user : req.user // get the user out of session and pass to template
                });
            });
        app.get('/logout', function(req, res) {
          req.logout();
          res.redirect('/');
        });
    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        app.get('/auth/google', passport.authenticate('google', { scope : ['profile','email','https://www.google.com/m8/feeds/contacts/default/full'] }));

        // the callback after google has authenticated the user
        app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
        }));
        app.get('/allblogs',isLoggedIn,function(req,res){
          console.log(req.user);
          var db =req.db;
          var collection = db.get('blogs');
          collection.find({},{},function(e,docs){
              res.render('allblogs', {   // which page to render
                  "bloglist" : docs
              });
          });

        } );
        app.get('/writeblog',function(req,res){
          res.render('writeblog',{title:'write a blog'});
        });
        app.post('/saveblog',isLoggedIn,function(req,res){
          var user = req.user;
          var title=req.body.title;
          var body=req.body.body;

          var blog=new Blog();
          blog.user = user;
          blog.title=title;
          blog.body = body;
          blog.comments = [];
          blog.createdOn = new Date();
          blog.save(function(err){
            if(err)
              console.log(err);

          });
          console.log('redirectuing')
          res.redirect('/allblogs');
        });
        app.get('/displayblog',isLoggedIn,function(req,res){
            var url_parts = url.parse(req.url,true);
            //console.log(url_parts);
            var query = url_parts.query;
            var id  = query.id;
            var ObjectId = require('mongodb').ObjectId;
            var o_id = new ObjectId(id);

            Blog.findOne({'_id':o_id},function(err,result){
              if(err)
                console.log(err);
              else
                res.render('displayblog',{blog:result});
            });

        });
        app.post('/savecomment',function(req,res){
          var comment = new Comment();
          var id = req.body.id;
          var ObjectId = require('mongodb').ObjectId;
          var blogId = new ObjectId(id);
          comment.user = req.user;
          comment.body = req.body.comment;
          comment.createdOn = new Date();
          Blog.findByIdAndUpdate(blogId,
            {$push:{comments:comment}},
            {safe: true, upsert: true},
            function(err, model) {
              Blog.findOne({'_id':blogId},function(err,result){
                if(err)
                  console.log(err);
                else
                  res.render('displayblog',{blog:result});
              });
            }
          );


        });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
