const mongoose = require("mongoose");

// const resultSchema = new mongoose.Schema(
//     {
//         // Reference to the Student (RollId or MongoDB _id)
//         RollId: {
//             type: String,
//             required: true,
//             trim: true,
//         },
//         // Reference to the Subject Code
//         SubjectCode: {
//             type: String,
//             required: true,
//             trim: true,
//         },
//         // The actual marks obtained
//         Marks: {
//             type: Number,
//             required: true,
//         }
//     },
//     {
//         // RegDate matches CreationDate; UpdationDate matches UpdationDate
//         timestamps: { 
//             createdAt: "PostingDate", 
//             updatedAt: "UpdationDate" 
//         },
//     }
// );

// module.exports = mongoose.model("Result", resultSchema, "results");

const resultSchema = new mongoose.Schema({
    RollId: { type: String, required: true, trim: true },
    SubjectCode: { type: String, required: true, trim: true },
    Marks: { type: Number, required: true }
}, {
    timestamps: { createdAt: "PostingDate", updatedAt: "UpdationDate" }
});

// Add this line to prevent duplicate marks for the same student/subject combo
resultSchema.index({ RollId: 1, SubjectCode: 1 }, { unique: true });

module.exports = mongoose.model("Result", resultSchema, "results");