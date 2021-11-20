var express = require('express');
var router = express.Router();
var Articles = require('../models/ArticlesModel');
var User = require('../models/User');
const {verifyToken} = require('./shared');


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


router.post("/", verifyToken, (req, res) => {
  const {name, description, images, title} = req.body;
  const newArticle = new Articles({
    name,
    description,
    title,
    images
  })
  newArticle.save().then((data)=>{
    AddArticleToUserTable(req, res, data)
  }).catch((err)=>{
    res.status(500).json({msg : "Error Adding new Article in Article Table", err})
  })
});

function AddArticleToUserTable(res, data) { 
  User.updateOne({_id: req.decoded._id}, {$push : {Articles : data._id}}).then(()=>{
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

router.delete("/:id", verifyToken, async (req, res) => {
  if(req.decoded.isAdmin){
    deleteFromUserTable(req, res);
  }else{
    checkIfThisUserIsTheOwnerOfThisArticle(req, res, false);
  }
});

function deleteFromUserTable(req, res) { 
  User.updateOne({_id: req.decoded._id}, {$pull : {Articles : {$in : [req.params.id]}}}).then(()=>{
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


router.put("/:id", verifyToken, async (req, res) => {
  if(req.decoded.isAdmin){
    updateArticleData(req, res);
  }else{
    checkIfThisUserIsTheOwnerOfThisArticle(req, res, true);
  }
});

function checkIfThisUserIsTheOwnerOfThisArticle(req, res, isExecutedAfterUpdate) { 
  User.findOne({Articles : req.params.id}).then((data)=>{
    if(data._id.toString() !== req.decoded._id){
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
