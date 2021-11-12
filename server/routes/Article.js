var express = require('express');
var router = express.Router();
var Articles = require('../models/ArticlesModel');
var User = require('../models/User');
var redis = require('redis');
var JWT =  require('jwt-redis').default;
var redisClient = redis.createClient();
var jwt = new JWT(redisClient);
const {secret}  = require('../secret') ;


router.get("/", async (req, res) => {
  await Articles
    .find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({msg : "Error finding Articles",  error });
    });
});


router.post("/", (req, res) => {
  jwt.verify(req.header('Authorization'), secret).then((decoded)=>{
    const {name, description, images, title} = req.body;
    const newArticle = new Articles({
      name,
      description,
      title,
      images
    })
    newArticle.save().then((data)=>{
      AddArticleToUserTable(res, data, decoded)
    }).catch((err)=>{
      res.status(500).json({msg : "Error Adding new Article in Article Table", err})
    })
  }).catch((err)=>{
    res.json({msg : "Unauthorized User", err})
  })
});

function AddArticleToUserTable(res, data, decoded) { 
  User.updateOne({_id: decoded._id}, {$push : {Articles : data._id}}).then(()=>{
    res.status(200).json({msg : "New Article have been Added to Article Table and User Table"})
}).catch((err)=>{
  res.status(500).json({msg : "Error Pushing new Article in user Table", err})
})
}

router.get("/:id", async (req, res) => {
  await Articles
    .findOne({_id: req.params.id})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ error });
    });
});

router.delete("/:id", async (req, res) => {

  jwt.verify(req.header('Authorization'), secret).then((decoded)=>{
    if(decoded.isAdmin){
      deleteFromUserTable(req, res, decoded);
    }else{
      checkIfThisUserIsTheOwnerOfThisArticle(req, res, decoded, false);
    }
  }).catch((err)=>{
    res.status(403).json({msg : "Unauthorized User", err})
  })

});

function deleteFromUserTable(req, res, decoded) { 
  User.updateOne({_id: decoded._id}, {$pull : {Articles : {$in : [req.params.id]}}}).then(()=>{
    deleteFromArticleTable(req, res);
  }).catch((err)=>{
    res.json({msg : "Error Deleting Article from User table", err})
  })
}

function deleteFromArticleTable(req, res) {
  Articles.deleteOne({_id : req.params.id}).then(()=>{
    res.status(200).json({msg : "Article have been deleted from Article Table and from User Table"});
  }).catch((err)=>{
    res.status(500).json({msg : "Error Deleting Article from Article Table", err});
  })
}


router.put("/:id", async (req, res) => {
  jwt.verify(req.header('Authorization'), secret).then((decoded)=>{
    if(decoded.isAdmin){
      updateArticleData(req, res);
    }else{
      checkIfThisUserIsTheOwnerOfThisArticle(req, res, decoded, true);
    }
  }).catch((err)=>{
    res.status(403).json({msg : "Unauthorized user", err})
  })
});

function checkIfThisUserIsTheOwnerOfThisArticle(req, res, decoded, isExecutedAfterUpdate) { 
  User.findOne({Articles : req.params.id}).then((data)=>{
    if(data._id.toString() !== decoded._id){
      res.json({msg : "You are not allowed to update this article"})
    }else if(isExecutedAfterUpdate){
      updateArticleData(req, res);
    }else{

    }
  })
}

function updateArticleData(req, res) {
  Articles.updateOne({_id: req.params.id}, {$set : req.body}).then(()=>{
    res.status(200).json({msg : "Article have been successfully updated"})
  }).catch((err)=>{
    res.status(500).json({msg : "Error Updating Article from server", err})
  })
}



module.exports = router;
