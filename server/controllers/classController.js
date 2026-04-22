const Class = require("../models/Class");
const Result = require("../models/Result");

// @desc    Get all classes for dropdowns (simple list)
// @route   GET /api/classes/get
exports.getClasses = async (req, res) => {
    try {
        const classes = await Class.find().sort({ ClassName: 1 });
        res.status(200).json(classes);
    } catch (err) {
        res.status(500).json({ 
            message: "Failed to retrieve classes", 
            error: err.message 
        });
    }
};

// @desc    Add a new class manually
// @route   POST /api/classes/add
exports.addClass = async (req, res) => {
    try {
        const { ClassName, Section } = req.body;

        // Check if class already exists
        const existingClass = await Class.findOne({ ClassName });
        if (existingClass) {
            return res.status(400).json({ message: "This class already exists." });
        }

        const newClass = new Class({ ClassName, Section });
        await newClass.save();
        
        res.status(201).json({ 
            success: true, 
            message: "Class created successfully!", 
            data: newClass 
        });
    } catch (err) {
        res.status(400).json({ 
            message: "Error creating class", 
            error: err.message 
        });
    }
};

// @desc    Get classes with counts of unique student results for Dashboard Cards
// @route   GET /api/classes/with-counts
exports.getClassesWithCounts = async (req, res) => {
    try {
        const classes = await Class.find().sort({ ClassName: 1 });
        const Result = require("../models/Result"); // Ensure path is correct

        // For each class, find how many results are declared
        const classDataWithCounts = await Promise.all(classes.map(async (cls) => {
            const count = await Result.countDocuments({ ClassId: cls.ClassName });
            return {
                ...cls._doc,
                totalResults: count
            };
        }));

        res.status(200).json(classDataWithCounts);
    } catch (err) {
        res.status(500).json({ message: "Error", error: err.message });
    }
};