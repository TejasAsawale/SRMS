const express = require("express");
const router = express.Router();
const { 
    getClasses, 
    addClass, 
    getClassesWithCounts 
} = require("../controllers/classController");

// Routes
router.get("/get", getClasses);
router.get("/get-with-counts", getClassesWithCounts);
router.post("/add", addClass);

module.exports = router;