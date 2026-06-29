import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function ExpenseList() {

    const [expenses, setExpenses] = useState([]);

    const navigate = useNavigate();

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

            console.log(err);

        }

    };

    useEffect(() => {

        fetchExpenses();

    }, []);

    const deleteExpense = async (id) => {

        if (!window.confirm("Delete this expense?")) return;

        try {

            const token = localStorage.getItem("token");

            await API.delete(`/expenses/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            fetchExpenses();

        } catch (err) {

            alert("Unable to delete expense");

        }

    };

    return (

        <div className="container mt-5">

            <div className="d-flex justify-content-between mb-4">

                <h2>Expense List</h2>

                <button
                    className="btn btn-success"
                    onClick={() => navigate("/add-expense")}
                >
                    Add Expense
                </button>

            </div>

            <table className="table table-bordered table-hover">

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

                        expenses.length === 0 ?

                            <tr>

                                <td colSpan="6" className="text-center">

                                    No Expenses Found

                                </td>

                            </tr>

                            :

                            expenses.map((expense) => (

                                <tr key={expense.id}>

                                    <td>{expense.title}</td>

                                    <td>₹ {expense.amount}</td>

                                    <td>{expense.category}</td>

                                    <td>
                                        {new Date(expense.expense_date).toLocaleDateString()}
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

    );

}

export default ExpenseList;