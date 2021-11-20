const express = require('express');
const router = express.Router();
const AgricultureCrops = require("../models/AgricultureCrops");
const Crops = require("../models/Crops");
const User = require("../models/User");
const Notification = require('../models/Notification');
const {verifyToken, addComment} = require('./shared');
const multer = require('multer');

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


router.get('/', (req, res) => { // works fine 
  AgricultureCrops.find({}).populate('Owner name')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error Finding AgricultureCrops",
        error,
      });
    });
});

router.get('/latestAgricultureCrop', (req, res) => { // works fine 
  AgricultureCrops.find({}).sort('-createdAt').limit(3)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      req.json({
        message: "Error Finding AgricultureCrops",
        error,
      });
    });
});

router.post('/',upload.single('images'), verifyToken ,(req, res) => { // works fine 
  Crops.findOne({
    _id: req.body.name,
  })
    .then((data) => {
      if (data === null) {
        res.status(403).json({
          msg: "you must enter a correct crop ID",
        });
      } else {
        checkForPriceAndQuantity(req, res);
      }
    })
    .catch(() => {
      console.log('Error line 69')
      res.status(404).json({
        message: "Error Finding Crop",
      });
    });
  });
  
  const checkForPriceAndQuantity = (req, res) => {
    if (req.body.price < 0 || req.body.quantity <= 0) {
      res.status(404).json({
        message: "Price and quantity must be greater than 0 ",
      });
    } else {
    checkForQuantityID(req, res);
  }
};

const checkForQuantityID = (req, res) => {
  
  if (req.body.quantityId < 1 || req.body.quantityId > 6) {
    res.status(403).json({
      message: "Quantity Id must between 1 and 6 ",
    });
  } else {
    AddAgricultureCrop(req, res);
  }
};

const AddAgricultureCrop = (req, res) => {
    let { name, description, locationLongitude, locationLatitude,price, quantity, quantityId} = req.body;
      let newAgricultureCrop = new AgricultureCrops({
        name,
        description,
        images: req.file.path,
        locationLongitude,
        locationLatitude,
        price,
        quantity,
        quantityId,
        Owner: req.decoded._id
      });
      newAgricultureCrop
        .save()
        .then((data) => {
          AddNewAgricultureCropToUserTable(req, res, data);
        })
        .catch((err) => {
          res.status(403).json({
            message: "Error Creating new Agriculture",
            err,
          });
        });
      
};

const AddNewAgricultureCropToUserTable = (req, res, data) => {
  User.updateOne(
    {
      _id: req.decoded._id,
    },
    {
      $push: {
        AgricultureCrop: data._id,
      },
    }
  )
    .then(() => {
      res.status(201).json({
        message: "New Agriculture Crop has been created",
      });
    })
    .catch((err1) => {
      res.json({
        msg: "Error Adding new Crop  ",
        err1,
      });
    });
};


router.post('/addComment/:id', verifyToken, addComment, (req, res)=>{
  AgricultureCrops.updateOne({_id: req.params.id},{$push: {comments: req.comment}}).then(()=>{
    const notification = new Notification({
      description: `${req.decoded.name} commented on your Product`
    })
    notification.save().then((newNotification)=>{
      User.updateOne({AgricultureCrop: req.params.id}, {$push: {Notification: newNotification._id}}).then((foundedUser)=>{
        res.status(200).json({msg: 'New Comment has been Added to Agriculture Crop'});
      }).catch((err)=>{
        res.status(500).json({err, msg: "Error finding user from server"})
      })
    }).catch((err)=>{
      res.status(500).json({msg: "Error Saving new notification from server .. ", err})
    })
  }).catch((err)=>{
    res.status(500).json({msg: 'Error While Adding new Comment', err})
  })
});

router.get('/:id',(req, res) => { // works fine 
  AgricultureCrops.findOne({
    _id: req.params.id,
  }).populate({
    path : 'comments',
    populate : {
      path : 'user'
    }
  })
  .populate('Owner')
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({
        error
      });
    });
});

router.delete('/:id',verifyToken, (req, res) => { // works fine 
  if (req.decoded.isAdmin) {
    deleteAgricultureCropFromUserTable(req, res);
  } else {
    checkIfThisUserIsTheOwnerOfThisAgricultureCrop(req, res, true);
  }
});

const deleteAgricultureCropFromUserTable = (req, res) => {
  User
  .updateOne({AgricultureCrop: req.params.id }, {$pull: {AgricultureCrop: {$in: [req.params.id]}}})
    .then(() => {
      AgricultureCrops.deleteOne({_id: req.params.id})
        .then(() => {
          res.status(200).json({msg: "Agriculture Crop has been deleted from this table and user table"});
        })
        .catch(() => {
          res.status(500).json({
            msg: "Error deleting agriculture Crop",
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        msg: "Error deleting Agriculture Crop in user table ",
        err,
      });
    });
};

router.patch('/:id', verifyToken,(req, res) => { // works fine 
  if (req.decoded.isAdmin) {
    updateAgricultureCrop(req, res);
  } else {
    checkIfThisUserIsTheOwnerOfThisAgricultureCrop(req,res,false);
  }
});

const updateAgricultureCrop = (req, res) => {
  AgricultureCrops.updateOne({_id: req.params.id},{$set: req.body})
    .then(() => {
      res.status(200).json({ msg: "Agriculture Crop have been updated" });
    })
    .catch((err) => {res.status(500).json({err});});
};

const checkIfThisUserIsTheOwnerOfThisAgricultureCrop = (req,res,isExecutedAfterDelete) => {
  User.findOne({
    AgricultureCrop: req.params.id,
  })
    .then((data) => {
      if (req.decoded._id === data._id.toString()) {
        if (isExecutedAfterDelete) {
          deleteAgricultureCrop(req, res);
        } else {
          updateAgricultureCrop(req, res);
        }
      } else {
        res.status(403).json({
          msg: "You are not the owner of this agriculture Crop",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        msg: "Error Finding User",
        err,
      });
    });
};

const deleteAgricultureCrop = (req, res) => {
  AgricultureCrops.deleteOne({
    _id: req.params.id,
  })
    .then(() => {
      deleteAgricultureCropFromUserTable(req, res);
    })
    .catch((err) => {
      res.status(500).json({
        msg: "Error deleting Agriculture Crop",
        err,
      });
    });
};



module.exports = router;
