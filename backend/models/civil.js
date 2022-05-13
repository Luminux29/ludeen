const mongoose = require('mongoose');

const civilSchema = mongoose.Schema({

    nameOfCivilServiceEligibility: {type: String, required: true},
    rating: {type: String, required: false},
    dateOfExamination: {type: Date, required: true},
    placeOfExamination: {type: String, required: true},
    licenseNo: {type: String, required: false},
    user_id: {type:  mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    dateOfValidity : {type:  Date, required: false}

  
});

module.exports = mongoose.model('Civil', civilSchema);
