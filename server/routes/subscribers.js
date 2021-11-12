var express = require('express');
var router = express.Router();
var {verifyToken} = require('./shared');
const {secret}  = require('../secret') ;
var Subscribers = require('../models/subscribers');

router.post('/', (req, res) => {
  Subscribers.findOne({email: req.body.email}).then((data)=>{
    if(data === null){
      const new__subscriber = new Subscribers({
        email : req.body.email
      });
      new__subscriber.save().then(data =>{
        res.status(201).json({data})
      })
      .catch((err)=>{
        res.status(500).json({msg : "Error while saving new document into DB", err})
      })
    }else{
      res.status(409).json({msg : "This subscriber is already exist"})
    }
  }).catch((err)=>{
    res.status(500).json({msg : "Error while Checking if subscriber exist", err})
  })
});

router.get('/', verifyToken ,(req, res)=>{
    if(req.decoded.isAdmin){
      Subscribers.find({}).then((data)=>{
        res.status(200).json({data})
      }).catch((err)=>{
        res.status(500).json({msg : "Error from server", err})
      })
    }else{  
      res.status(403).json({msg : "Only Admin can view Subscribers"})
    }
})

router.get('/:email', verifyToken ,(req, res)=>{
    if(req.decoded.isAdmin){
      Subscribers.findOne({email: req.params.email}).then((data)=>{
        res.status(200).json({data})
      }).catch((err) => {
        res.status(500).json({msg : "Error from server", err})
      })
    }else{
      res.status(403).json({msg : "Only Admin can view this subscriber"})
    }
})

router.delete('/:id', verifyToken , (req, res)=>{
  if(req.decoded.isAdmin){
    Subscribers.deleteOne({_id: req.params.id}).then((data)=>{
      res.status(200).json(data)
    }).catch((err)=>{
      res.status(500).json({msg : "Error from server", err})
    })
  }else{  
    res.status(403).json({msg : "Only Admin can delete subscribers"})
  }
})

module.exports = router;
