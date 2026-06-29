import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

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

            toast.success("Expense Added Successfully");

            navigate("/expenses");

        }

        catch (err) {

            toast.error(err.response?.data?.message || "Something went wrong");

        }

    };

    return (

        <>

            <Navbar />

            <div className="container mt-5">

                <div className="row justify-content-center">

                    <div className="col-md-7">

                        <div className="card shadow-lg">

                            <div className="card-header bg-success text-white text-center">

                                <h3>Add New Expense</h3>

                            </div>

                            <div className="card-body">

                                <form onSubmit={handleSubmit}>

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Expense Title
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Expense Title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Amount
                                        </label>

                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Enter Amount"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            required
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Category
                                        </label>

                                        <select
                                            className="form-select"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            required
                                        >

                                            <option value="">
                                                Select Category
                                            </option>

                                            <option value="Food">
                                                Food
                                            </option>

                                            <option value="Travel">
                                                Travel
                                            </option>

                                            <option value="Shopping">
                                                Shopping
                                            </option>

                                            <option value="Bills">
                                                Bills
                                            </option>

                                            <option value="Health">
                                                Health
                                            </option>

                                            <option value="Education">
                                                Education
                                            </option>

                                            <option value="Entertainment">
                                                Entertainment
                                            </option>

                                            <option value="Other">
                                                Other
                                            </option>

                                        </select>

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Expense Date
                                        </label>

                                        <input
                                            type="date"
                                            className="form-control"
                                            value={expense_date}
                                            onChange={(e) => setExpenseDate(e.target.value)}
                                            required
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Description
                                        </label>

                                        <textarea
                                            className="form-control"
                                            rows="4"
                                            placeholder="Enter Description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />

                                    </div>

                                    <div className="d-grid">

                                        <button
                                            className="btn btn-success btn-lg"
                                        >
                                            Add Expense
                                        </button>

                                    </div>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default AddExpense;