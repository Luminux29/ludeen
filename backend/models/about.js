const mongoose = require('mongoose');

const aboutSchema = mongoose.Schema({

    vision: {type: String, required: true},
    mission: {type: String, required: true},
    logo: {type: String, required: true}
  
  
});

module.exports = mongoose.model('About', aboutSchema);
