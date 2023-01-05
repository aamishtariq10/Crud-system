const mongoose = require("mongoose");
let userSchema = new mongoose.Schema(
    {
    userName  :  String ,
    userEmail : String ,
    userPassword : String,
    }
);

const User = mongoose.model("User" , userSchema);
module.exports = User; 