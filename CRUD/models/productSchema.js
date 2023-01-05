const mongoose= require("mongoose");
let  carSchema = new mongoose.Schema({
    carCompany: String,
    carName: String,
    carModel: Number ,
    carPrice: Number,
    Features: [String],

  });
  const Cars = mongoose.model("Cars" ,carSchema);
  module.exports = Cars; 