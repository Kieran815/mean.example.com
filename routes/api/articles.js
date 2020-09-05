var express = require('express');
var router = express.Router();
var Articles = require('../../models/articles');

router.get('/', function(req, res, next) {
  Articles.find({},function(err, articles){
    if(err){
     return res.json({'success':false, 'error': err});
   }
    return res.json({'success':true, 'articles': articles});
  });
});

module.exports = router;

// curl -H "Content-Type: application/json" -X GET http://localhost:3000/api/articles/


// db.articles.insert({"title": "Hello World!", "slug":"hello-world", "body":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", "keywords":"lorem ipsum", "description":"Lorem Ipsum from some random text generator."})