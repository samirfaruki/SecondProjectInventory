var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config()
const mongoDB = process.env.MONGO_KEY;



mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true });// database connectivity



const db1 = mongoose.connection;



db1.on('error', console.error.bind(console, 'MongoDB connection error:'));
  

// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
var categoryRouter = require("./routes/catalog");
var productRouter = require("./routes/catalog");
var CategoryById = require("./routes/catalog");
var createRouter = require("./routes/catalog");
var postRouter = require("./routes/catalog");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);
app.use("/", categoryRouter);
app.use("/product", productRouter);
app.use("catalog/category/:id", CategoryById);
app.use("/Category/create", createRouter);
app.use("/createItem", postRouter);

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

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = app;
