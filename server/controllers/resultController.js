const Result = require('../models/Result');

// Add/Declare Result
const addResult = async (req, res) => {
    try {
        const { RollId, SubjectCode, Marks } = req.body;

        // Basic validation
        if (!RollId || !SubjectCode || Marks === "") {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const resultExists = await Result.findOne({ RollId, SubjectCode });
        if (resultExists) {
            return res.status(400).json({ success: false, message: "Result already declared for this subject" });
        }

        const newResult = new Result({ 
            RollId, 
            SubjectCode, 
            Marks: Number(Marks)
        });
        
        await newResult.save();
        res.status(201).json({ success: true, message: "Result declared successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// Get All Results (For Admin Table)
const getAllResults = async (req, res) => {
    try {
        // .lean() makes the query faster if you're just displaying data
        const results = await Result.find().sort({ PostingDate: -1 }).lean(); 
        res.status(200).json({ success: true, data: results });
    } catch (error) {
        console.error("Backend Error:", error);
        res.status(500).json({ success: false, message: "Error fetching results" });
    }
};

// Update Result
const updateResult = async (req, res) => {
    try {
        const { id } = req.params;
        const { Marks } = req.body; 

        if (Marks === undefined || Marks < 0 || Marks > 100) {
            return res.status(400).json({ success: false, message: "Invalid Marks value" });
        }

        const updatedResult = await Result.findByIdAndUpdate(
            id, 
            { Marks: Number(Marks) }, 
            { new: true, runValidators: true }
        );

        if (!updatedResult) {
            return res.status(404).json({ success: false, message: "Result not found" });
        }

        res.status(200).json({ success: true, message: "Result updated successfully", data: updatedResult });
    } catch (error) {
        res.status(500).json({ success: false, message: "Update Error", error: error.message });
    }
};

// Delete Result
const deleteResult = async (req, res) => {
    try {
        const deleted = await Result.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Result not found" });
        }
        res.status(200).json({ success: true, message: "Result deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Delete Error" });
    }
};

const updateResultByData = async (req, res) => {
    try {
        const { RollId, SubjectCode, Marks } = req.body;

        if (!RollId || !SubjectCode || Marks === undefined) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Find by student and subject, then update the marks
        const updatedResult = await Result.findOneAndUpdate(
            { RollId, SubjectCode },
            { Marks: Number(Marks) },
            { new: true, runValidators: true, upsert: true }
        );

        res.status(200).json({ 
            success: true, 
            message: "Result updated successfully", 
            data: updatedResult 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Update Error", error: error.message });
    }
};

module.exports = { addResult, getAllResults, updateResult, deleteResult, updateResultByData};