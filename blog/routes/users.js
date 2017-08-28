var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.redirect('/users/login');
});

/*GET main login page route*/
router.get('/login',function(req,res,next){
  res.render('login', { title: 'login' });
});

/*POST login form inputs*/
router.post('/loginUser',function(req,res){
  res.send("login done");
});
module.exports = router;
