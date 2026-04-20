// const mongoose = require("mongoose");

// const subjectSchema = new mongoose.Schema(
//     {
//         SubjectName: {
//             type: String,
//             required: true,
//             trim: true,
//         },
//         SubjectCode: {
//             type: String,
//             required: true,
//             unique: true, // Like 'MATH101'
//             trim: true,
//         }
//     },
//     {
//         // Maps to your original SQL timing fields
//         timestamps: { createdAt: "CreationDate", updatedAt: "UpdationDate" },
//     }
// );

// module.exports = mongoose.model("Subject", subjectSchema, "subjects");

const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
    {
        SubjectName: {
            type: String,
            required: true,
            trim: true,
        },
        SubjectCode: {
            type: String,
            required: true,
            trim: true,
        },
        ClassId: {
            type: String,
            required: true,
            trim: true,
        }
    },
    {
        timestamps: { createdAt: "CreationDate", updatedAt: "UpdationDate" },
    }
);

// Unique per class, not globally
subjectSchema.index({ SubjectCode: 1, ClassId: 1 }, { unique: true });

module.exports = mongoose.model("Subject", subjectSchema, "subjects");