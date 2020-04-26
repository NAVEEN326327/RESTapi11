const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    // name, dob, email, ph no.
    id: {
        type: Number,
        unique: true,
        autoIncrement: true
        
    },
    name: {
        type: String, lowercase: true,
        required: [true, "Can't be blank"],
        minlength: 3
    },
   
    country: {
        type: String,
        required: true,
        minlength: 2
    }
  
},{
    timestamps: true,
})

const User = mongoose.model('User', userSchema);

module.exports = User;