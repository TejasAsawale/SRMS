// const mongoose = require("mongoose");

// const studentSchema = new mongoose.Schema(
//     {
//         StudentName: {
//             type: String,
//             required: true, // Changed from default: null to required
//             trim: true,
//         },
//         RollId: {
//             type: String,
//             unique: true,
//             default: function () {
//                 return "S" + Math.floor(Math.random() * 10000); // Temporary auto-ID
//             },
//         },
//         StudentEmail: {
//             type: String,
//             required: true, // Added required for auth
//             unique: true,   // Added unique for login
//             lowercase: true,
//             trim: true,
//         },
//         Password: {         // NEW FIELD: Must exist to store the hash
//             type: String,
//             required: true,
//         },
//         Gender: {
//             type: String,
//             default: "Other",
//         },
//         DOB: {
//             type: String,
//             default: null,
//         },
//         ClassId: {
//             type: String,
//             default: "Default",
//         },
//         Status: {
//             type: Number,
//             default: 1,
//         },
//         Subjects: {
//             type: [String],
//             default: []
//         },
//     },
//     {
//         timestamps: { createdAt: "RegDate", updatedAt: "UpdationDate" },
//     },
// );

// module.exports = mongoose.model("Student", studentSchema, "students");

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
            required: true, // Required as per registration form
            default: "Select",
        },
        DOB: {
            type: String, // Storing as string to match your MM/DD/YYYY format
            required: true,
        },
        ClassId: {
            type: String, // Maps to "Class / Department" in your form
            required: true,
            trim: true,
        },
        RollId: {
            type: String,
            unique: true,
            // Automatic Generation Logic
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
        // Customizing timestamp names to match your legacy SRMS requirements
        timestamps: { createdAt: "RegDate", updatedAt: "UpdationDate" },
    },
);

module.exports = mongoose.model("Student", studentSchema, "students");
