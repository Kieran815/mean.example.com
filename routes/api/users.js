var express = require('express');
var router = express.Router();
// import `/models/users`
var Users = require('../../models/users');

router.get('/', function(req, res, next) {
  Users.find({}, function(err, users) {
    if (err) {
      return res.json({'success': false, 'error': err});
    }
    return res.json({'success': true, 'users': users});
  });
});

// GET/READ request, User ID
router.get('/:userId', function(req,res){
  
  var userId = req.params.userId;
   Users.findOne({'_id':userId}, function(err, user){
     if(err){
      return res.json({'success':false, 'error': err});
    }
     return res.json({'success':true, 'user': user});
   });
 });

// POST/CREATE request, New User
router.post('/', function(req, res) {
  Users.create(new Users({
    username: req.body.username,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name
  }), function(err, user){
    
    if(err){
      return res.json({success: false, user: req.body, error: err});
    }

    return res.json({success: true, user: user});
    
  });
});

module.exports = router;