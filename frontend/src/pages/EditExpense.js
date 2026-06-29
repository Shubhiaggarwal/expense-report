import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
function EditExpense() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [expense, setExpense] = useState({
        title: "",
        amount: "",
        category: "",
        expense_date: "",
        description: ""
    });

    useEffect(() => {

        const fetchExpense = async () => {

            try {

                const token = localStorage.getItem("token");

                const res = await API.get("/expenses", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const selectedExpense = res.data.find(
                    (item) => item.id === Number(id)
                );

                if (selectedExpense) {

                    setExpense({
                        title: selectedExpense.title,
                        amount: selectedExpense.amount,
                        category: selectedExpense.category,
                        expense_date: selectedExpense.expense_date.split("T")[0],
                        description: selectedExpense.description
                    });

                }

            }

            catch (err) {

                toast.error(err.response?.data?.message || "Failed to fetch expense");

            }

        };

        fetchExpense();

    }, [id]);

    const handleChange = (e) => {

        setExpense({
            ...expense,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await API.put(

                `/expenses/${id}`,

                expense,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            toast.success("Expense Updated Successfully");

            navigate("/expenses");

        }

        catch (err) {

            toast.error(err.response?.data?.message || "Update Failed");

        }

    };

    return (

        <>

            <Navbar />

            <div className="container mt-5">

                <div className="row justify-content-center">

                    <div className="col-md-7">

                        <div className="card shadow-lg">

                            <div className="card-header bg-primary text-white text-center">

                                <h3>Edit Expense</h3>

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
                                            name="title"
                                            value={expense.title}
                                            onChange={handleChange}
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
                                            name="amount"
                                            value={expense.amount}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Category
                                        </label>

                                        <select
                                            className="form-select"
                                            name="category"
                                            value={expense.category}
                                            onChange={handleChange}
                                            required
                                        >

                                            <option value="">Select Category</option>
                                            <option value="Food">Food</option>
                                            <option value="Travel">Travel</option>
                                            <option value="Shopping">Shopping</option>
                                            <option value="Bills">Bills</option>
                                            <option value="Health">Health</option>
                                            <option value="Education">Education</option>
                                            <option value="Entertainment">Entertainment</option>
                                            <option value="Other">Other</option>

                                        </select>

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Expense Date
                                        </label>

                                        <input
                                            type="date"
                                            className="form-control"
                                            name="expense_date"
                                            value={expense.expense_date}
                                            onChange={handleChange}
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
                                            name="description"
                                            value={expense.description}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <div className="d-grid">

                                        <button
                                            className="btn btn-primary btn-lg"
                                        >
                                            Update Expense
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

export default EditExpense;