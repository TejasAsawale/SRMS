const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    ClassName: {
        type: String,
        required: true,
        unique: true, // Prevents "Class 1" and "class 1" from being separate
        trim: true
    },
    Section: {
        type: String, // Optional: e.g., 'A', 'B', or 'Science'
        default: ''
    },
    CreationDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Classes', classSchema);