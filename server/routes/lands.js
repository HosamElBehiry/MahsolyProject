const express = require("express");
const router = express.Router();
const User = require("../models/User");
const AgricultureLand = require("../models/AgricultureLand");
var {verifyToken} = require('./shared');
var multer = require('multer');
const SingleFile = require('../models/SingleFile');

const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null,'uploads')
  },
  filename: (req, file, cb)=>{
    cb(null, new Date().toISOString().replace(/:/g,'-') + file.originalname)
  }
});
const fileFilter = (req, file, cb) =>{
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
    cb(null, true);
  }else{
    cb(null, false);
  }
}

const upload = multer({storage,fileFilter})


router.post("/", verifyToken, upload.single('image'), async (req, res) => {
  if (req.body.type < 1 || req.body.type > 6) {
    res.status(404).json({ msg: "Type must be between 1 and 6" });
  } else if (req.body.price < 0) {
    res.status(404).json({ msg: "Price must be grater than 0" });
  } else if (req.body.measurement < 1 || req.body.measurement > 3) {
    res.status(404).json({ msg: "Measurement must be between 1 and 3" });
  } else {
    addNewAgricultureLand(req, res);
  }
});


const addNewAgricultureLand = (req, res) => {
  let {
    description,
    area,
    longitude,
    latitude,
    type,
    price,
    measurement,
  } = req.body;
  const newLand = new AgricultureLand({
    description,
    area,
    image: req.file.path,
    longitude,
    latitude,
    type,
    price,
    measurement,
    Owner: req.decoded._id
  });
  newLand
    .save()
    .then((data) => {
      addAgricultureLandToUserTable(req, res, data);
    })
    .catch((err) => {
      res.status(500).json({ msg: "Error Adding New Agriculture Land", err });
    });
};

const addAgricultureLandToUserTable = (req, res, data) => {
  User.updateOne({ _id: req.decoded._id }, { $push: { AgricultureLand: data._id } })
    .then(() => {
      res
        .status(201)
        .json({ msg: "Agriculture Land have been added successfully" });
    })
    .catch((err) => {
      res.json({
        msg: "Error finding User to add Agriculture land on his table",
        err,
      });
    });
};


router.get("/", async (req, res) => {
  try {
    const land = await AgricultureLand.find({}).populate('Owner');
    res.status(200).json(land);
  } catch (error) {
    res.status(500).json({msg : "Server Error"});
  }
});


router.get("/:id", async (req, res) => {
  try {
    const land = await AgricultureLand.findOne({ _id: req.params.id }).populate('Owner');
    if (!land) {
      res.status(404).json({ msg: "This Land not Found" });
    }
    res.status(200).json(land);
  } catch (error) {
    res.status(500).json({msg : "Server Error"});
  }
});


router.delete("/:id", verifyToken, async (req, res) => {
  if(req.decoded.isAdmin){
    deleteAgricultureLandFromUserTable(req, res);
  }else{
    checkIfUserIsTheOwnerOfAgricultureLand(req, res, true)
  }
});

const deleteAgricultureLandFromUserTable = (req, res) => { 
  User.updateOne({AgricultureLand : req.params.id},{$pull : {AgricultureLand : {$in :[req.params.id]}}})
  .then(()=>{
    deleteAgricultureLandFromAgricultureLandTable(req, res);
  }).catch((err)=>{
    res.status(500).json({msg : "Error deleting Agriculture Land From User Table", err})
  })
};

const deleteAgricultureLandFromAgricultureLandTable = (req, res) => { 
  AgricultureLand.deleteOne({_id: req.params.id}).then(()=>{
    res.status(200).json({msg : "Agriculture Land has been deleted from Agriculture table and from User table"});  
  }).catch((err)=>{
    res.status(500).json({msg : "Error Deleting Agriculture land from server", err})
  })
};

router.put("/:id", verifyToken, async (req, res) => {
  if(req.decoded.isAdmin){
    updateAgricultureLand(req, res);
  }else{
    checkIfUserIsTheOwnerOfAgricultureLand(req, res, false);
  }
});

const checkIfUserIsTheOwnerOfAgricultureLand = (req, res, isExecutedAfterDelete) => { 
  User.findOne({AgricultureLand : req.params.id},{password : 0}).then((data)=>{
    if(data._id.toString() === req.decoded._id){
      if(isExecutedAfterDelete){
        deleteAgricultureLandFromUserTable(req, res)
      }else{
        updateAgricultureLand(req, res);
      }
    }else{
      res.status(403).json({msg : "You are not allowed"})
    }
  }).catch((err)=>{
    res.status(500).json({msg : "Error finding user from server .. ", err})
  })
};

const updateAgricultureLand = (req, res) => { 
  AgricultureLand.updateOne({_id: req.params.id},{$set : req.body}).then(()=>{
    res.status(200).json({msg : "Agriculture Land has been updated successfully"})
  }).catch((err)=>{
    res.status(500).json({msg : "Error updating Agriculture Land from server .. "})
  })
};

module.exports = router;
