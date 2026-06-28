const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    getSummary,
    getCategoryReport
} = require("../controllers/dashboardController");

router.get("/summary", verifyToken, getSummary);

router.get("/category", verifyToken, getCategoryReport);

module.exports = router;