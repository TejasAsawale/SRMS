const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    ClassName: {
        type: String,
        required: true,
        unique: true, 
        trim: true
    },
    Section: {
        type: String, 
        default: ''
    },
    CreationDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Classes', classSchema);