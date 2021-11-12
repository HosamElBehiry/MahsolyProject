var express = require("express");
const { check, validationResult } = require("express-validator");
var router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/User");
var jwt = require('jsonwebtoken');
const {secret}  = require('../secret') ;
const {verifyToken} = require('./shared');
let hashedPassword;

/* GET All Users. */
router.get("/", async (req, res) => {
  await User.find({}, {password : 0})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ err });
    });
});

/*Posting New User */
router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check(
      "password",
      `password must be at least one upperCase, one lowerCase, one Digit, one special character, minimum length is 8`
    ).matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[# ?!@$%^&*-]).{8,}$/
    ),
    check("email", "Email is not valid").isEmail(),
    check("mobile", "mobile is not valid").matches(
      /^(010|011|012|015)[0-9]{8}/
    ),
  ],
  checkEmail,
  checkMobile,
  hashPassword,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        mobile: req.body.mobile,
        location: req.body.location ? req.body.location : "",
        image: req.body.image ? req.body.image : "",
        isAdmin : req.body.isAdmin
      });
      await newUser
        .save()
        .then((data) => {
          console.log('data')
          let {_id, name, email, mobile, isAdmin, location, image, favourites} = data;
          jwt.sign({_id, name, email, mobile, isAdmin, location, image, favourites}, secret, {
            expiresIn: "24h", // able to change
          }).then((token)=>{
              res.json({ msg: "New User have been Created", token });
          }).catch((err)=>{
            res.json({msg: err})
          });
        })
        .catch((err) => {
          res.status(404).json({ err });
        });
    }
  }
);

// check if email exists
async function checkEmail(req, res, next) {
  await User.find({ email: req.body.email })
    .then((data) => {
      if (data.length > 0) {
        res.status(403).json({ error: "This Email is already exists" });
      } else {
        next();
      }
    })
    .catch((err) => {
      res.status(404).json({ err });
    });
}

// check if mobile exists
async function checkMobile(req, res, next) {
  await User.find({ mobile: req.body.mobile })
    .then((data) => {
      if (data.length > 0) {
        res.status(403).json({ error: "This Mobile is already exists" });
      } else {
        next();
      }
    })
    .catch((err) => {
      res.json({ err });
    });
}

//hashing password
async function hashPassword(req, res, next) {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      res.status(404).json({ err });
    } else {
      hashedPassword = hash;
      next();
    }
  });
}

router.get('/whoAmI',verifyToken, (req, res) =>{
  res.status(200).json(req.decoded)
})

// login using jwt with mobile number and password ..
router.post("/login", async (req, res) => {
  await User.findOne({ mobile: req.body.mobile })
    .then((data) => {
      if (data === null) {
        res.status(404).json({ message: "this mobile is not exist" });
      } else {
        bcrypt
          .compare(req.body.password, data.password)
          .then((response) => {
            if (response) {
              let {_id, name, email, mobile, isAdmin, location, image, favourites} = data;
              const token = jwt.sign({_id, name, email, mobile, isAdmin, location, image, favourites}, secret, {
                expiresIn: "24h",
              })
              res.json({ msg: "Successfully Logged in", token });
            } else res.json({ message: "Password is incorrect" });
          })
          .catch((err) => {
            res.status(404).json({ err });
          });
      }
    })
    .catch((err) => {
      res.status(404).json({ err });
    });
});

//Find By Mobile
router.get("/getMobile", async (req, res) => {
  await User.findOne({ mobile: req.body.mobile })
    .then((data) => {
      if (data === null) {
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      res.json({ err });
    });
});


// add products to favourites

router.post('/add-to-favourites/:product_id',verifyToken ,(req, res)=>{
  User.findOne({favourites: req.params.product_id}).then((data)=>{
    if (data === null){
      AddToFavourites(req, res);
    }else{
      DeleteFromFavoutites(req, res);
    }
  }).catch((Err)=>{
    res.json(Err)
  })
})

function AddToFavourites(req, res){
    User.updateOne({_id: req.decoded._id}, {$push : {favourites: req.params.product_id}})
    .then(()=>{
      res.status(200).json({msg : "Product is added to your Favourites"})
    }).catch(()=>{
      res.status(500).json({msg : "Error adding favourites from server .. "})
    })
}

function DeleteFromFavoutites(req, res){
  User.updateOne({_id: req.decoded._id}, {$pull : {favourites: req.params.product_id}})
  .then(()=>{
    res.status(200).json({msg : "Product is deleted from your Favourites"})
  }).catch(()=>{
    res.status(500).json({msg : "Error adding favourites from server .. "})
  })
}


// Find User By Id ..
router.get("/:id", async (req, res) => {
  await User.findOne({ _id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Delete User By Id
router.delete("/deleteUser/:id", verifyToken , async (req, res) => {
  await User.deleteOne({_id : req.params.id}).then(()=>{
    res.status(200).json({msg  : "User have been deleted"})
  }).catch((err)=>{
    res.status(404).json({msg : "Error deleting User", err})
  })
});

// update User By IDs
router.put("/updateUser/:id", verifyToken, async (req, res) => {
  if (req.decoded.isAdmin || req.decoded._id === req.params.id) {
    await User.updateOne({ _id: req.params.id }, { $set: req.body })
      .then((data) => {
        res.status(200).json({ message: "updated Successfully", data });
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  } else {
    res.json({ msg: "You are not allowed to update this user" });
  }
});

module.exports = router;
