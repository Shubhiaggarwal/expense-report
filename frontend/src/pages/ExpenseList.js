import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function ExpenseList() {

    const navigate = useNavigate();

    const [expenses, setExpenses] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    const fetchExpenses = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await API.get("/expenses", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setExpenses(res.data);

        } catch (err) {

            toast.error(err.response?.data?.message || "Failed to fetch expenses");

        }

    };

    useEffect(() => {

        fetchExpenses();

    }, []);

    const deleteExpense = async (id) => {

        if (!window.confirm("Delete this expense?"))
            return;

        try {

            const token = localStorage.getItem("token");

            await API.delete(`/expenses/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            fetchExpenses();

        }

        catch (err) {

            toast.error(err.response?.data?.message || "Unable to delete expense");

        }

    };

    const filteredExpenses = expenses.filter((expense) => {

        const titleMatch =
            expense.title.toLowerCase().includes(search.toLowerCase());

        const categoryMatch =
            category === "All" || expense.category === category;

        return titleMatch && categoryMatch;

    });

    return (

        <>

            <Navbar />

            <div className="container mt-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>Expense List</h2>

                    <button
                        className="btn btn-success"
                        onClick={() => navigate("/add-expense")}
                    >
                        + Add Expense
                          </button>

                </div>

                <div className="row mb-3">

                    <div className="col-md-6">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Expense..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>

                    <div className="col-md-4">

                        <select
                            className="form-select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >

                            <option value="All">All Categories</option>
                            <option value="Food">Food</option>
                            <option value="Travel">Travel</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Bills">Bills</option>

                        </select>

                    </div>

                </div>

                <table className="table table-striped table-hover shadow">

                    <thead className="table-dark">

                        <tr>

                            <th>Title</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredExpenses.length === 0 ?

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="text-center"
                                    >

                                        No Expenses Found

                                    </td>

                                </tr>

                                :

                                filteredExpenses.map((expense) => (

                                    <tr key={expense.id}>

                                        <td>{expense.title}</td>

                                        <td>₹ {expense.amount}</td>

                                        <td>{expense.category}</td>

                                        <td>

                                            {new Date(
                                                expense.expense_date
                                            ).toLocaleDateString()}

                                        </td>

                                        <td>{expense.description}</td>

                                        <td>

                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() =>
                                                    navigate(`/edit-expense/${expense.id}`)
                                                }
                                            >

                                                Edit

                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    deleteExpense(expense.id)
                                                }
                                            >

                                                Delete

                                            </button>

                                        </td>

                                    </tr>

                                ))

                        }

                    </tbody>

                </table>

            </div>

        </>

    );

}

export default ExpenseList;