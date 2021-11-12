var express = require('express');
var router = express.Router();
var Contact = require('../models/Contact');
const {verifyToken} = require('./shared');

router.post('/', (req, res)=>{
  let {fullName, email, mobile, message} = req.body;
  let new__contact = new Contact({fullName, email, mobile, message});
  new__contact.save()
      .then((data)=>{
        res.status(200).json({data, msg : "You successfully contacted with us "})
      }).catch((err)=>{
        res.status(500).json({msg : "Error from server ..", err})
      });
});

router.get('/',verifyToken,(req, res)=>{
  if(req.decoded.isAdmin){
    Contact.find({}).then((data)=>{
      res.status(200).json({data})
    }).catch((err)=>{
      res.status(500).json({msg : "Error from server", err})
    })
  }else{  
    res.status(403).json({msg : "Only Admin can view contacts"})
  }
})

router.get('/:id',verifyToken, (req, res)=>{
  if(req.decoded.isAdmin){
    Contact.findOne({_id: req.params.id}).then((data)=>{
      res.status(200).json({data})
    }).catch((err) => {
      res.status(500).json({msg : "Error from server", err})
    })
  }else{
    res.status(403).json({msg : "Only Admin can view this contact"})
  }
})

router.delete('/:id',verifyToken, (req, res)=>{
  if(req.decoded.isAdmin){
    Contact.deleteOne({_id: req.params.id}).then((data)=>{
      res.status(200).json({data})
    }).catch((err)=>{
      res.status(500).json({msg : "Error from server", err})
    })
  }else{  
    res.status(403).json({msg : "Only Admin can delete contacts"})
  }
})



module.exports = router;