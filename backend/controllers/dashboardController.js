const db = require("../config/db");

// Dashboard Summary
const getSummary = (req, res) => {

    const user_id = req.user.id;

    const sql = `
        SELECT
            COUNT(*) AS totalTransactions,
            IFNULL(SUM(amount),0) AS totalExpense,
            IFNULL(MAX(amount),0) AS highestExpense
        FROM expenses
        WHERE user_id = ?
    `;

    db.query(sql, [user_id], (err, result) => {

        if (err)
            return res.status(500).json(err);

        res.json(result[0]);

    });

};
// Category-wise Report
const getCategoryReport = (req, res) => {

    const user_id = req.user.id;

    const sql = `
        SELECT
            category,
            SUM(amount) AS total
        FROM expenses
        WHERE user_id = ?
        GROUP BY category
        ORDER BY total DESC
    `;

    db.query(sql, [user_id], (err, result) => {

        if (err)
            return res.status(500).json(err);

        res.json(result);

    });

};

module.exports = {
    getSummary,
    getCategoryReport
};