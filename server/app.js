const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require('cors');
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const agCropsRouter = require("./routes/agriculture-crops-router");
const CropsNameRouter = require("./routes/cropsRouter");
const Articles = require("./routes/Article");
const AgricultureLands = require('./routes/lands')
const ContactUs = require('./routes/contact')
const Subscribers = require('./routes/subscribers')
const Comments = require('./routes/comments');
const pendingAgricultureCrops = require('./routes/pending')
const bodyParser = require('body-parser');
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json())
app.use(cors());

mongoose.connect('mongodb+srv://HosamBehiry:Hosam123456789@mahsoly.wi6ov.mongodb.net/Mahsoly?retryWrites=true&w=majority', (err) => {
  if (err) {
    console.log("error connecting to database");
  } else {
    console.log("database connected");
  }
});



app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/agriculture-crops-router", agCropsRouter);
app.use("/cropsRouter", CropsNameRouter);
app.use("/Articles", Articles);
app.use("/lands", AgricultureLands);
app.use("/contact", ContactUs);
app.use('/subscribers', Subscribers);
app.use('/comments', Comments);
app.use('/pendingCrops', pendingAgricultureCrops);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
