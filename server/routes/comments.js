var express = require('express');
var router = express.Router();
const {verifyToken} = require('./shared');
var Comments = require('../models/Comments');
var User = require('../models/User');
const {secret}  = require('../secret') ;

router.post('/',verifyToken,(req, res)=>{
  const new__comment = new Comments({
    user : req.decoded._id,
    description: req.body.description
  })
  new__comment.save().then((data)=>{
    addCommentToUserTable(req, res, data);
  }).catch((err)=>{
    res.status(500).json({msg : "Error while saving from server", err})
  })
})

const addCommentToUserTable = (req, res, data) => {
  User.updateOne({ _id: req.decoded._id }, { $push: { comments: data._id } })
    .then(() => {
      res
        .status(201)
        .json({ msg: "Comment have been added successfully" });
    })
    .catch((err) => {
      res.json({
        msg: "Error finding User to add Comment on his table",
        err,
      });
    });
};

router.get('/', (req, res, ) => {
  Comments.find({}).then((data)=>{
    res.status(200).json({data})
  }).catch((err)=>{
    res.status(500).json({msg : "Error while getting all comments from server", err})
  })
});

router.get('/:id', (req, res, ) => {
  Comments.findOne({_id: req.params.id}).then((data)=>{
    res.status(200).json({data})
  }).catch((err)=>{
    res.status(500).json({msg : "Error while getting comment from server", err})
  })
});

router.delete("/:id", verifyToken, async (req, res) => {
    if(req.decoded.isAdmin){
      deleteCommentFromUserTable(req, res);
    }else{
      checkIfUserIsTheOwnerOfComment(req, res, true)
    }
});

const deleteCommentFromUserTable = (req, res) => { 
  User.updateOne({comments : req.params.id},{$pull : {comments : {$in :[req.params.id]}}}).then(()=>{
    deleteCommentFromCommentTable(req, res);
  }).catch((err)=>{
    res.status(500).json({msg : "Error deleting Comment From User Table", err})
  })
};

const deleteCommentFromCommentTable = (req, res) => { 
  Comments.deleteOne({_id: req.params.id}).then(()=>{
    res.status(200).json({msg : "Comment has been deleted from Comment and from User table"});  
  }).catch((err)=>{
    res.status(500).json({msg : "Error Deleting Comment from server", err})
  })
};

router.put("/:id", verifyToken, async (req, res) => {
    if(req.decoded.isAdmin){
      updateComment(req, res);
    }else{
      checkIfUserIsTheOwnerOfComment(req, res, false);
    }
});

const checkIfUserIsTheOwnerOfComment = (req, res, isExecutedAfterDelete) => { 
  User.findOne({comments : req.params.id},{password : 0}).then((data)=>{
    if(data._id.toString() === req.decoded._id){
      if(isExecutedAfterDelete){
        deleteCommentFromUserTable(req, res)
      }else{
        updateComment(req, res);
      }
    }else{
      res.status(403).json({msg : "You are not allowed"})
    }
  }).catch((err)=>{
    res.status(500).json({msg : "Error finding user from server .. ", err})
  })
};

const updateComment = (req, res) => { 
  Comments.updateOne({_id: req.params.id},{$set : req.body}).then(()=>{
    res.status(200).json({msg : "Comment has been updated successfully"})
  }).catch((err)=>{
    res.status(500).json({msg : "Error updating Comment from server .. ", err})
  })
};

module.exports = router;
