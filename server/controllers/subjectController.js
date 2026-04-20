// const Subject = require('../models/Subject');

// // Add a new Subject
// const addSubject = async (req, res) => {
//     try {
//         const { SubjectName, SubjectCode } = req.body;
//         // check if already exists or not for prevent data duplication.
//         const subjectExists = await Subject.findOne({ SubjectCode });
//         if (subjectExists) {
//             return res.status(400).json({ message: "Subject Code already exists" });
//         }

//         const newSubject = new Subject({ SubjectName, SubjectCode });
//         const savedSubject = await newSubject.save();

//         res.status(201).json({ message: "Subject added successfully", data: savedSubject });
//     } catch (error) {
//         res.status(500).json({ message: "Server Error", error: error.message });
//     }
// };

// // Get all Subjects
// const getAllSubjects = async (req, res) => {
//     try {
//         const subjects = await Subject.find();
//         res.status(200).json(subjects);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching subjects", error: error.message });
//     }
// };

// module.exports = { addSubject, getAllSubjects };

const Subject = require('../models/Subject');

// 1. Add Subject
const addSubject = async (req, res) => {
    try {
        const { SubjectName, SubjectCode, ClassId } = req.body;

        if (!SubjectName || !SubjectCode || !ClassId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const subjectExists = await Subject.findOne({ SubjectCode, ClassId });
        if (subjectExists) {
            return res.status(400).json({ message: "Subject Code already exists for this class" });
        }

        const newSubject = new Subject({ SubjectName, SubjectCode, ClassId });
        const savedSubject = await newSubject.save();

        res.status(201).json({ message: "Subject added successfully", data: savedSubject });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// 2. Get All Subjects
const getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find().sort({ ClassId: 1 });
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ message: "Error fetching subjects", error: error.message });
    }
};

// 3. Get Subjects by Class
const getSubjectsByClass = async (req, res) => {
    try {
        const { classId } = req.params;
        const subjects = await Subject.find({ ClassId: classId }).sort({ SubjectName: 1 });
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ message: "Error fetching subjects", error: error.message });
    }
};

// 4. Update Subject
const updateSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const { SubjectName } = req.body;

        if (!SubjectName) {
            return res.status(400).json({ message: "Subject name is required" });
        }

        const updated = await Subject.findByIdAndUpdate(
            id,
            { SubjectName },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Subject not found" });
        }

        res.status(200).json({ message: "Subject updated successfully", data: updated });
    } catch (error) {
        res.status(500).json({ message: "Update Error", error: error.message });
    }
};

// 5. Delete Subject
const deleteSubject = async (req, res) => {
    try {
        const deleted = await Subject.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: "Subject not found" });
        }
        res.status(200).json({ message: "Subject deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Delete Error", error: error.message });
    }
};

module.exports = { addSubject, getAllSubjects, getSubjectsByClass, updateSubject, deleteSubject };