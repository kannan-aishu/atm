const mongoose = require("mongoose")

const Create_User = mongoose.Schema({
    // name: { type: String, required: true },
    Username:String,
    Account_Number:Number,
    Phone_Number:Number,
    Address:String,
    Password:String,
    Email_Id:String,
    Statement:[{
        status:String,
        amount:Number,
        dateAndTime:String
    }],
    Age:Number,
    Balance:Number
})
const Usermodel = mongoose.model("users",Create_User)
module.exports = Usermodel;