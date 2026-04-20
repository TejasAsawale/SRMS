const express = require('express');
const router = express.Router();
const { addStudent,
        getStudents, 
        loginStudent,
        updateStudent, 
        deleteStudent 
    } = require('../controllers/studentController');

// POST /api/students/addStudent (Signup)
router.post('/addStudent', addStudent); 

// POST /api/students/login (Login)
router.post('/login', loginStudent); 

// GET /api/students/get (Get All Students)
router.get('/get', getStudents);  

// NEW: Update route (requires ID as a parameter)
router.put('/update/:id', updateStudent);  

// NEW: Delete route (requires ID as a parameter)
router.delete('/delete/:id', deleteStudent);  

module.exports = router;