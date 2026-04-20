const express = require('express');
const router = express.Router();
// const { addResult, getAllResults, updateResult, deleteResult, getStudentResult } = require('../controllers/resultController');
const { addResult, getAllResults, updateResult, deleteResult } = require('../controllers/resultController');

router.post('/addResult', addResult);
router.get('/all', getAllResults); // New
router.put('/update/:id', updateResult); // New
router.delete('/delete/:id', deleteResult); // New
// router.get('/student/:rollId', getStudentResult); 

module.exports = router;