const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({

    email: { type: String, required: true, unique: true },
    password: {type: String, required: true},
  profilePic: {type: String, required: false},

  LastName: {type: String, required: false},
  FirstName: {type: String, required: false},
  birthdate: {type: Date, required: false},



});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
