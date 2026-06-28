const db = require("../config/db");

// Add Expense
const addExpense = (req, res) => {

    const user_id = req.user.id;

    const {
        title,
        amount,
        category,
        expense_date,
        description
    } = req.body;

    const sql = `
        INSERT INTO expenses
        (user_id, title, amount, category, expense_date, description)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            user_id,
            title,
            amount,
            category,
            expense_date,
            description
        ],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Expense Added Successfully"
            });

        }
    );
};

// Get All Expenses
const getExpenses = (req, res) => {

    const user_id = req.user.id;

    db.query(
        "SELECT * FROM expenses WHERE user_id = ?",
        [user_id],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json(result);

        }
    );
};
// Update Expense
const updateExpense = (req, res) => {

    const id = req.params.id;

    const {
        title,
        amount,
        category,
        expense_date,
        description
    } = req.body;

    const sql =
        `UPDATE expenses
         SET title=?,amount=?,category=?,expense_date=?,description=?
         WHERE id=?`;

    db.query(
        sql,
        [title, amount, category, expense_date, description, id],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Expense Updated Successfully"
            });

        });

};

// Delete Expense
const deleteExpense = (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM expenses WHERE id=?",
        [id],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Expense Deleted Successfully"
            });

        });

};

module.exports = {
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpense
};