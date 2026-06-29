import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

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

                console.log(err);

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

            alert("Expense Updated Successfully");

            navigate("/expenses");

        }

        catch (err) {

            alert("Update Failed");

        }

    };

    return (

        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-body">

                    <h2 className="text-center mb-4">

                        Edit Expense

                    </h2>

                    <form onSubmit={handleSubmit}>

                        <input
                            className="form-control mb-3"
                            name="title"
                            value={expense.title}
                            onChange={handleChange}
                        />

                        <input
                            className="form-control mb-3"
                            type="number"
                            name="amount"
                            value={expense.amount}
                            onChange={handleChange}
                        />

                        <input
                            className="form-control mb-3"
                            name="category"
                            value={expense.category}
                            onChange={handleChange}
                        />

                        <input
                            className="form-control mb-3"
                            type="date"
                            name="expense_date"
                            value={expense.expense_date}
                            onChange={handleChange}
                        />

                        <textarea
                            className="form-control mb-3"
                            name="description"
                            value={expense.description}
                            onChange={handleChange}
                        />

                        <button className="btn btn-primary w-100">

                            Update Expense

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default EditExpense;