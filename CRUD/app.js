var createError = require("http-errors");
var express = require("express");
const mongoose = require("mongoose");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var indexRouter = require("./routes/index");
var User = require("./routes/user");
var ProductsRouter = require("./routes/products");
var sessionAuth = require("./Middleware/sessionAuth");
var app = express();
app.use(session({ secret: "key board cat", cookie: { maxAge: 60000 } }));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(sessionAuth);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", User);
app.use("/", indexRouter);
app.use("/products", ProductsRouter);

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

mongoose
  .connect("mongodb://localhost:27017/Crud", { useNewUrlParser: true })
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err.message));

module.exports = app;
