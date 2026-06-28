const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
    res.send("Expense Controller Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});