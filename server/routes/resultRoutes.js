const express = require('express');
const router = express.Router();
// const { addResult, getAllResults, updateResult, deleteResult, getStudentResult } = require('../controllers/resultController');
const { addResult, getAllResults, updateResult, deleteResult, updateResultByData} = require('../controllers/resultController');

router.post('/addResult', addResult);
router.get('/all', getAllResults); 
router.put('/update/:id', updateResult); 
router.delete('/delete/:id', deleteResult); 
router.put('/updateResult', updateResultByData);
// router.get('/student/:rollId', getStudentResult); 

module.exports = router;