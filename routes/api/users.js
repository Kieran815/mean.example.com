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

// PUT/UPDATE request, Edit User
router.put('/', function(req, res){

  Users.findOne({'_id': req.body._id}, function(err, user){

   if(err) {
     return res.json({success: false, error: err});
   }

   if(user) {

    let data = req.body;

    if(data.username){
      user.username = data.username;
    };

    if(data.email){
    user.email = data.email;
    };

    if(data.first_name){
    user.first_name = data.first_name;
    };

    if(data.last_name){
    user.last_name = data.last_name;
    };

    user.save(function(err){
      if(err){
        return res.json({success: false, error: err});
      }else{
        return res.json({success: true, user:user});
      }
    });

   }

  });
  
});

// DELETE/DELETE request, Delete User
router.delete('/:userId', function(req,res){

  var userId = req.params.userId;

  Users.remove({'_id':userId}, function(err,removed){

    if(err){
      return res.json({success: false, error: err});
    }

    return res.json({success: true, status: removed});

  });

});


module.exports = router;


/* CREATE
curl -d '{"email": "kieran.milligan@gmail.com", "username": "Kieran", "first_name": "Kieran", "last_name": "Milligan"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/users
*/

/* READ
curl -H "Content-Type: application/json" -X GET http://localhost:3000/api/users/5f512cbe79a2984218c76682
*/

/* UPDATE
curl -d '{"_id":"5f512cbe79a2984218c76682", "first_name":"Robert"}' -H "Content-Type: application/json" -X PUT http://localhost:3000/api/users

*/

/* DELETE
curl -H "Content-Type: application/json" -X DELETE http://localhost:3000/api/users/${userID}
*/