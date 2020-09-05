var express = require('express');
var router = express.Router();
var Articles = require('../../models/articles');

// get all articles
router.get('/', function(req, res, next) {
  Articles.find({},function(err, articles){
    if(err){
     return res.json({'success':false, 'error': err});
   }
    return res.json({'success':true, 'articles': articles});
  });
});

// read single article
router.get('/:articleId', function(req,res){
  
  var articleId = req.params.articleId;
   Articles.findOne({'_id':articleId}, function(err, article){
     if(err){
      return res.json({'success':false, 'error': err});
    }
     return res.json({'success':true, 'article': article});
   });
 });

 // create new article
router.post('/', function(req, res) {
  Articles.create(new Articles({
    articlename: req.body.articlename,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name
  }), function(err, article){
    
    if(err){
      return res.json({success: false, article: req.body, error: err});
    }

    return res.json({success: true, article: article});
    
  });
});

// Update article
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

// delete article
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

























// *** EXTRA LINES FOR TESTING

// curl -H "Content-Type: application/json" -X GET http://localhost:3000/api/articles/


// db.articles.insert({"title": "Hello World!", "slug":"hello-world", "body":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", "keywords":"lorem ipsum", "description":"Lorem Ipsum from some random text generator."})