const mongoose = require('mongoose');

const workSchema = mongoose.Schema({

    toDate: {type: Date , required: false, default: null},
    fromDate: {type: Date, required: true},
    position: {type: String, required: true},
    dept: {type: String, required: true},
    monthlySalary: {type: Number, required: true},
    salaryGrade: {type: String,  min:4,  max: 4},
    status: {type: String, enum : ['Permanent', 'Temporary', 'Part-time'], required: true},
    government : {type: Boolean, required: true},
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User" ,required: true }

  
});

module.exports = mongoose.model('Work', workSchema);
