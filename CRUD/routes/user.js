var express = require('express');
var router = express.Router();
var user= require("../models/userAuth");
/* GET home page. */

router.get("/register", function(req, res, next) {
    res.render("./auth/register");
  });
router.post("/register", async function(req, res, next) {
    let User = new user(req.body);
    await User.save();
    req.session.User = User;
    console.log(User);
    res.redirect("/");
  });
router.get("/login", function(req, res, next) {
    res.render("./auth/login");
  });

router.post("/login", async function(req, res, next) {
    let User = await  user.findOne({userEmail:req.body.userEmail , userPassword:req.body.userPassword});
   
    if(!User) return res.redirect("./login");
    req.session.User = User;
    return res.redirect("/");
  });
  router.get("/logout", function(req, res, next) {
    req.session.User = null
    res.redirect("/");
  });

module.exports = router;
 