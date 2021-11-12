var jwt = require('jsonwebtoken');
const {secret}  = require('../secret') ;
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

module.exports = {verifyToken}