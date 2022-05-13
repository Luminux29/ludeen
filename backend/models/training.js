const mongoose = require('mongoose');

const trainingSchema = mongoose.Schema({
    title: { type: String, required: true },
    fromDate: {type:  Date, required: true },
    toDate: { type:  Date, required: true },
    noOfHours: { type: Number, required : true},
    typeOfLearningDevelopment: { type: String, required: true },
    conductor: { type: String,  required: true },
    certificate: { type: String, required: true },
    user_id: { type: String, required: true }

});

module.exports = mongoose.model('Training', trainingSchema);