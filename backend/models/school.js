const mongoose = require('mongoose');

const schoolSchema = mongoose.Schema({

  nameOfSchool: {type: String, required: true},
  course: {type: String, required: true},
  fromYear: {type: String, required: true},
  toYear: {type: String, required: false},
  highestLevel: {type: String},
  yearGraduated: {type: String},
  type: {type: String, enum:['Elementary', 'Secondary', 'Vocational', 'College', 'Graduate Studies'], required: true},
  honor: {type: String},
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User" ,required: true }


});

module.exports = mongoose.model('School', schoolSchema);
