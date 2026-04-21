const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Ensure you've run: npm install jsonwebtoken

const addStudent = async (req, res) => {
    try {
        const { StudentName, RollId, StudentEmail, Password, Gender, DOB, ClassId } = req.body;

        const studentExists = await Student.findOne({ 
            $or: [{ RollId }, { StudentEmail }] 
        });
        
        if (studentExists) {
            return res.status(400).json({ success: false, message: "Roll ID or Email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        const newStudent = new Student({
            StudentName,
            RollId,
            StudentEmail,
            Password: hashedPassword,
            Gender: Gender || "Not Specified",
            DOB: DOB || null,
            ClassId: ClassId || "Default",
            Status: 1 
        });

        const savedStudent = await newStudent.save();

        res.status(201).json({
            success: true,
            message: "Student added successfully",
            data: { id: savedStudent._id, name: savedStudent.StudentName }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check Admin first
        if (email === process.env.REACT_APP_ADMIN_EMAIL &&
            password === process.env.REACT_APP_ADMIN_PASSWORD) {
            const token = jwt.sign(
                { role: 'admin' },
                process.env.JWT_SECRET || 'your_secret_key_here',
                { expiresIn: '24h' }
            );
            return res.status(200).json({
                success: true,
                message: "Admin Login Successful",
                token: token,
                role: 'admin',
                student: { name: "System Admin", email: email }
            });
        }

        // 2. Find student
        const student = await Student.findOne({ StudentEmail: email });
        if (!student) {
            return res.status(400).json({ success: false, message: "Student not found" });
        }

        // 3. Check password
        const isMatch = await bcrypt.compare(password, student.Password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // 4. Generate token
        const token = jwt.sign(
            { id: student._id, role: 'student' },
            process.env.JWT_SECRET || 'your_secret_key_here',
            { expiresIn: '24h' }
        );

        // 5. Send response
        res.status(200).json({
            success: true,
            message: "Login successful",
            token: token,
            role: 'student',
            student: {
                name: student.StudentName,
                email: student.StudentEmail,
                rollId: student.RollId
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Login Error", error: error.message });
    }
};

const getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: "Error fetching students", error: error.message });
    }
};

// UPDATE Student
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        let updates = { ...req.body };
        if (updates.Password && updates.Password.trim() !== "") {
            const salt = await bcrypt.genSalt(10);
            updates.Password = await bcrypt.hash(updates.Password, salt);
        } else {
            delete updates.Password;
        }
        const updatedStudent = await Student.findByIdAndUpdate(
            id, 
            { $set: updates }, 
            { new: true, runValidators: true }
        );
        if (!updatedStudent) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }
        res.status(200).json({ 
            success: true, 
            message: "Student updated successfully", 
            data: updatedStudent 
        });
    } catch (error) {
        console.error("Backend Update Error:", error);       
        res.status(500).json({ 
            success: false, 
            message: error.code === 11000 ? "Roll ID or Email already exists" : "Update Error", 
            error: error.message 
        });
    }
};

// DELETE Student
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        res.status(200).json({ success: true, message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Delete Error", error: error.message });
    }
};

// UPDATE Subject
const updateSubjects = async (req, res) => {
    try {
        const { id } = req.params;
        const { Subjects } = req.body;

        if (!Array.isArray(Subjects)) {
            return res.status(400).json({ success: false, message: "Subjects must be an array" });
        }

        const updated = await Student.findByIdAndUpdate(
            id,
            { $set: { Subjects } },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        res.status(200).json({ success: true, message: "Subjects updated", data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: "Update Error", error: error.message });
    }
};

module.exports = { addStudent, getStudents, loginStudent, updateStudent, deleteStudent, updateSubjects };