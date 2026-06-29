import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AddExpense() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [expense_date, setExpenseDate] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await API.post(
                "/expenses",
                {
                    title,
                    amount,
                    category,
                    expense_date,
                    description
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Expense Added Successfully");

            navigate("/dashboard");

        }

        catch (err) {

            alert(err.response?.data?.message || "Something went wrong");

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-body">

                            <h2 className="text-center mb-4">
                                Add Expense
                            </h2>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label>Title</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>Amount</label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>Category</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>Date</label>

                                    <input
                                        type="date"
                                        className="form-control"
                                        value={expense_date}
                                        onChange={(e) => setExpenseDate(e.target.value)}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>Description</label>

                                    <textarea
                                        className="form-control"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />

                                </div>

                                <button
                                    className="btn btn-success w-100"
                                >
                                    Add Expense
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AddExpense;