const express = require('express');
const router = express.Router();
const { addStudent,
        getStudents, 
        loginStudent,
        updateStudent, 
        deleteStudent,
        updateSubjects,
        getStudentByEmail
    } = require('../controllers/studentController');


// Routes
router.post('/addStudent', addStudent); 
router.post('/login', loginStudent); 
router.get('/get', getStudents);  
router.put('/update/:id', updateStudent);  
router.delete('/delete/:id', deleteStudent); 
router.put('/updateSubjects/:id', updateSubjects);
router.get('/byEmail/:email', getStudentByEmail);

module.exports = router;