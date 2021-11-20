const express = require('express');
const router = express.Router();
const PendingAgricultureCrop = require('../models/PendingAgricultureCrops');
const {verifyAdminToken} = require('./shared');

router.get('/', verifyAdminToken, (req, res) => {
  PendingAgricultureCrop.find({}).populate('Owner').then((data)=>{
    res.status(200).json(data);
  }).catch((err)=>{
    res.status(500).json({msg : "Error while getting pending Crops from server ..", err})
  })
});

router.get('/:id', verifyAdminToken, (req, res) => {
  PendingAgricultureCrop.findOne({_id: req.params.id}).populate('Owner').then((data)=>{
    res.status(200).json(data);
  }).catch((err)=>{
    res.status(500).json({msg : "Error while getting pending Crops from server ..", err})
  })
});

router.delete('/:id', verifyAdminToken, (req, res) => {
  PendingAgricultureCrop.deleteOne({_id: req.params.id}).then((data)=>{
    res.status(200).json(data);
  }).catch((err)=>{
    res.status(500).json({msg : "Error while deleting pending Crops from server ..", err})
  })
});

router.put('/:id', verifyAdminToken, (req, res) => {
  PendingAgricultureCrop.updateOne({_id: req.params.id}, {$set: req.body}).then((data)=>{
    res.status(200).json(data);
  }).catch((err)=>{
    res.status(500).json({msg : "Error while deleting pending Crops from server ..", err})
  })
});

module.exports = router;
