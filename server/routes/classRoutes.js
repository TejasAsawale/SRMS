// const express = require("express");
// const router = express.Router();
// const classController = require("../controllers/classController");

// router.get("/get", classController.getClasses);
// router.post("/add", classController.addClass);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { 
    getClasses, 
    addClass, 
    getClassesWithCounts 
} = require("../controllers/classController");

// Basic list (used for dropdowns in Add Result)
router.get("/get", getClasses);

// List with counts (used for the Cards on ResultsPage)
router.get("/get-with-counts", getClassesWithCounts);

// Add a new class
router.post("/add", addClass);

module.exports = router;