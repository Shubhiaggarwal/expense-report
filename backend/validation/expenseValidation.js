const { body } = require("express-validator");

const expenseValidation = [

    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required"),

    body("amount")
        .isFloat({ gt: 0 })
        .withMessage("Amount must be greater than 0"),

    body("category")
        .trim()
        .notEmpty()
        .withMessage("Category is required"),

    body("expense_date")
        .notEmpty()
        .withMessage("Expense Date is required")

];

module.exports = expenseValidation;