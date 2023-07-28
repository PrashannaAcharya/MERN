const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: String, // String is shorthand for {type: String}
    phoneNumber: Number,
    email: String,
    password: String,
    mode:{type:String,default:'user'},
    vehicleDetails: Object
    });
    
    const Users = mongoose.model('Users', userSchema);
    module.exports = Users