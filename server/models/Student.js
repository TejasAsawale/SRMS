const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        StudentName: {
            type: String,
            required: true,
            trim: true,
        },
        StudentEmail: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        Password: {
            type: String,
            required: true,
        },
        Gender: {
            type: String,
            required: true, 
            default: "Select",
        },
        DOB: {
            type: String, // MM/DD/YYYY format
            required: true,
        },
        ClassId: {
            type: String, 
            required: true,
            trim: true,
        },
        RollId: {
            type: String,
            unique: true,
            default: function () {
                const year = new Date().getFullYear();
                const random = Math.floor(1000 + Math.random() * 9000);
                return `S-${year}-${random}`;
            },
        },
        Status: {
            type: Number,
            default: 1, // 1 for Active, 0 for Inactive
        },
        Subjects: {
            type: [String],
            default: []
        },
    },
    {
        timestamps: { createdAt: "RegDate", updatedAt: "UpdationDate" },
    },
);

module.exports = mongoose.model("Student", studentSchema, "students");
