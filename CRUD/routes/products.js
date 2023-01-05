const { response } = require("express");
var express = require("express");
var Products = express.Router();
const Car = require("../models/productSchema");
var checkSessionAuth = require("../Middleware/checkSession");

Products.get("/", async function (req, res, next) {
  let Cars = await Car.find();
  console.log(req.session.User);
  res.render("products", { Cars });
});
Products.get("/add", checkSessionAuth, async function (req, res, next) {
  res.render("addproducts");
});

Products.post("/add", async function (req, res, next) {
  let Cars = new Car(req.body);
  await Cars.save();
  res.redirect("/products");
});
Products.get("/delete/:id", checkSessionAuth, async function (req, res, next) {
  let Cars = await Car.findByIdAndDelete(req.params.id);
  console.log("deleted");
  console.log(Cars);
  res.redirect("/products");
});
Products.get("/edit/:id", checkSessionAuth, async function (req, res, next) {
  let Cars = await Car.findById(req.params.id);
  // console.log("deleted");
  // console.log(Cars) ;
  // res.redirect("/products");
  res.render("editproducts", { Cars });
});

Products.post("/edit/:id", checkSessionAuth, async function (req, res, next) {
  let Cars = await Car.findById(req.params.id);
  Cars.carCompany = req.body.carCompany;
  Cars.carName = req.body.carName;
  Cars.carModel = req.body.carModel;
  Cars.carPrice = req.body.carPrice;
  Cars.Features = req.body.Features;
  await Cars.save();
  res.redirect("/products");
});
//cart

Products.get("/cart/:id", checkSessionAuth, async function (req, res, next) {
  let car = await Car.findById(req.params.id);
  let X = [];
  {
    if (req.cookies.cart) X = req.cookies.cart;
  }

  X.push(car);
  res.cookie("cart", X);
  res.redirect("/products");
});
Products.get("/cart/delete/:id", async function (req, res, next) {
  let X = [];
  {
    if (req.cookies.cart) X = req.cookies.cart;
  }

  //splice used to remove element from the array
  // x.splice (index , no of items to remove );
  // here we can find index using findindex function passing c as parameter that is elements of array
  // and then companring it to requested parameter
  X.splice(
    X.findIndex((c) => c._id == req.params.id),
    1
  );
  res.cookie("cart", X);
  res.redirect("/cart");
});

module.exports = Products;
