const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({

    email: { type: String, required: true, unique: true },
    password: {type: String, required: true},
    status: {type: String, enum: ['Pending', 'Rejected', 'Accepted'], required: false, default:"Pending"},
    rejectedReason  : {type: String, required: false, default: null},

  profilePic: {type: String, required: false},
  EmployeeNumber: {type: String, required: false},
  LastName: {type: String, required: false},
  FirstName: {type: String, required: false},
  MidInit: {type: String, required: false},
  NameExtention: {type: String, required: false},
  birthdate: {type: Date, required: false},
  PlaceOfBirth: {type: String, required: false},
  gender: {type: String, required: false},
  CivilStatus: {type: String, required: false, default: null},
  height: {type: String, required: false},
  weight: {type: String, required: false},
  BloodType: {type: String, required: false},
  gsis: {type: String, required: false},
  pagibig: {type: String, required: false},
  philHealth: {type: String, required: false},
  sss: {type: String, required: false},
  tin: {type: String, required: false},
  citizenship: {type: String, required: false},
  r_zipCode: {type: String, required: false},
  r_lotNo: {type: String, required: false},
  r_street: {type: String, required: false},
  r_village: {type: String, required: false},
  r_brgy: {type: String, required: false},
  r_city: {type: String, required: false},
  r_province: {type: String, required: false},
  p_zipCode: {type: String, required: false},
  p_LotNo: {type: String, required: false},
  p_street: {type: String, required: false},
  p_village: {type: String, required: false},
  p_brgy: {type: String, required: false},
  p_city: {type: String, required: false},
  p_province: {type: String, required: false},

  altEmail: {type: String, required: false},
  TelNo: {type: String, required: false},
  MobileNo: {type: String, required: false},
  status: {type: String, default:"Pending"},
  role: {type: String, enum: ['Admin','Faculty'],required: true}



});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
