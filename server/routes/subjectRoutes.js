// const express = require('express');
// const router = express.Router();
// const { addSubject, getAllSubjects } = require('../controllers/subjectController');

// router.post('/add', addSubject);
// router.get('/all', getAllSubjects);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { 
    addSubject, 
    getAllSubjects, 
    getSubjectsByClass,
    updateSubject, 
    deleteSubject 
} = require('../controllers/subjectController');

router.post('/add', addSubject);
router.get('/all', getAllSubjects);
router.get('/class/:classId', getSubjectsByClass);
router.put('/update/:id', updateSubject);
router.delete('/delete/:id', deleteSubject);

module.exports = router;