var jwt = require('jsonwebtoken');
const {secret}  = require('../secret') ;
const Comments = require('../models/Comments');
const verifyToken = (req, res, next) =>{
  const authHeader = req.headers.authorization;
  if(authHeader){
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secret, (err, decoded)=>{
      if(err){
        res.status(403).json({msg : "Error invalid with Token"})
      }else{
        req.decoded = decoded;
        next();
      }
    })
  }else{
    res.status(401).json({msg : "Unauthorized User"})
  }
}

const verifyAdminToken = (req, res, next) =>{
  const authHeader = req.headers.authorization;
  if(authHeader){
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secret, (err, decoded)=>{
      if(err){
        res.status(403).json({msg : "Error invalid with Token"})
      }else{
        if(decoded.isAdmin){
          req.decoded = decoded;
          next();
        }else{
          res.status(401).json({msg : "Unauthorized User"})
        }
      }
    })
  }else{
    res.status(401).json({msg : "Unauthorized User"})
  }
}

const addComment = (req, res, next) =>{
  const newComment = new Comments({
    user: req.decoded._id,
    description: req.body.description
  })
  newComment.save().then((data)=>{
    req.comment = data._id;
    next();
  }).catch((err)=>{
    res.status(500).json({msg: 'Error while Saving new Comment', err})
  })
}

module.exports = {verifyToken, verifyAdminToken, addComment}