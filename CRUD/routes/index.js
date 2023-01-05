var express = require('express');
var router = express.Router();

/* GET home page. */

router.get("/", function(req, res, next) {
  res.render("index");
});
router.get("/contactus", function(req, res, next) {
  res.render("contactus");
});
router.get("/cart", async function(req, res, next) {
  let Cart = await req.cookies.cart;
  if (!Cart)  Cart=[];
  console.log("indexxxxxxxxxxxxxxxxxxxxxxx")  
  res.render("cart" , {Cart});
});

module.exports = router;

