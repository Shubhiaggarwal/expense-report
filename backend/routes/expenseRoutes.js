const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const validate = require("../middleware/validationMiddleware");

const expenseValidation = require("../validation/expenseValidation");

const {

    addExpense,

    getExpenses,

    updateExpense,

    deleteExpense

} = require("../controllers/expenseController");

router.post(
    "/",
    verifyToken,
    expenseValidation,
    validate,
    addExpense
);

router.get(
    "/",
    verifyToken,
    getExpenses
);

router.put(
    "/:id",
    verifyToken,
    expenseValidation,
    validate,
    updateExpense
);

router.delete(
    "/:id",
    verifyToken,
    deleteExpense
);

module.exports = router;