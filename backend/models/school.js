const mongoose = require('mongoose');

const schoolSchema = mongoose.Schema({

  nameOfSchool: {type: String, required: true},
  course: {type: String, required: true},
  fromYear: {type: String, required: true},
  toYear: {type: String, required: false},
  highestLevel: {type: String, required: true},
  yearGraduated: {type: String, required: true},
  type: {type: String, enum:['Elementary', 'Secondary', 'Vocational', 'College', 'Graduate Studies'], required: true},
  honor: {type: String, required: true},
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User" ,required: true }


});

module.exports = mongoose.model('School', schoolSchema);
