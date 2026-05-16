const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    RollId: { type: String, required: true, trim: true },
    SubjectCode: { type: String, required: true, trim: true },
    Marks: { type: Number, required: true }
}, {
    timestamps: { createdAt: "PostingDate", updatedAt: "UpdationDate" }
});

// prevent duplicate data
resultSchema.index({ RollId: 1, SubjectCode: 1 }, { unique: true });

module.exports = mongoose.model("Result", resultSchema, "results");