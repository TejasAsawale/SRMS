// const Result = require('../models/Result');

// // 1. Add/Declare Result
// const addResult = async (req, res) => {
//     try {
//         const { RollId, SubjectCode, Marks } = req.body;
//         const resultExists = await Result.findOne({ RollId, SubjectCode });
//         if (resultExists) {
//             return res.status(400).json({ success: false, message: "Result already declared for this subject" });
//         }

//         const newResult = new Result({ RollId, SubjectCode, Marks });
//         await newResult.save();
//         res.status(201).json({ success: true, message: "Result declared successfully" });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Server Error", error: error.message });
//     }
// };

// // // 2. Get All Results (For Admin Table)
// // const getAllResults = async (req, res) => {
// //     try {
// //         const results = await Result.find().sort({ PostingDate: -1 });
// //         res.status(200).json({ success: true, data: results });
// //     } catch (error) {
// //         res.status(500).json({ success: false, message: "Error fetching results" });
// //     }
// // };

// const getAllResults = async (req, res) => {
//     try {
//         const results = await Result.find().sort({ PostingDate: -1 });
//         // We wrap it in a 'data' property to match the frontend call
//         res.status(200).json({ success: true, data: results });
//     } catch (error) {
//         console.error("Backend Error:", error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // 3. Update Result
// const updateResult = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updatedResult = await Result.findByIdAndUpdate(id, req.body, { new: true });
//         res.status(200).json({ success: true, message: "Result updated successfully", data: updatedResult });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Update Error" });
//     }
// };

// // 4. Delete Result
// const deleteResult = async (req, res) => {
//     try {
//         await Result.findByIdAndDelete(req.params.id);
//         res.status(200).json({ success: true, message: "Result deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Delete Error" });
//     }
// };

// // // 5. Get Student Result (Report Card)
// // const getStudentResult = async (req, res) => {
// //     try {
// //         const { rollId } = req.params;
// //         const results = await Result.find({ RollId: rollId });
// //         if (results.length === 0) return res.status(404).json({ success: false, message: "No results found" });
// //         res.status(200).json({ success: true, data: results });
// //     } catch (error) {
// //         res.status(500).json({ success: false, message: "Error fetching results" });
// //     }
// // };

// module.exports = { addResult, getAllResults, updateResult, deleteResult };

const Result = require('../models/Result');

// 1. Add/Declare Result
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
            Marks: Number(Marks) // Ensure it's stored as a number
        });
        
        await newResult.save();
        res.status(201).json({ success: true, message: "Result declared successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// 2. Get All Results (For Admin Table)
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

// 3. Update Result
const updateResult = async (req, res) => {
    try {
        const { id } = req.params;
        const { Marks } = req.body; // Only destructure what you want to allow changing

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

// 4. Delete Result
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