const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        StudentName: {
            type: String,
            required: true, // Changed from default: null to required
            trim: true,
        },
        RollId: {
            type: String,
            unique: true,
            default: function () {
                return "S" + Math.floor(Math.random() * 10000); // Temporary auto-ID
            },
        },
        StudentEmail: {
            type: String,
            required: true, // Added required for auth
            unique: true,   // Added unique for login
            lowercase: true,
            trim: true,
        },
        Password: {         // NEW FIELD: Must exist to store the hash
            type: String,
            required: true,
        },
        Gender: {
            type: String,
            default: "Other",
        },
        DOB: {
            type: String,
            default: null,
        },
        ClassId: {
            type: String,
            default: "Default",
        },
        Status: {
            type: Number,
            default: 1,
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