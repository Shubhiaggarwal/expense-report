import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {

    const navigate = useNavigate();

    const [summary, setSummary] = useState({
        totalTransactions: 0,
        totalExpense: 0,
        highestExpense: 0
    });

    useEffect(() => {

        const fetchSummary = async () => {

            try {

                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/");
                    return;
                }

                const res = await API.get("/dashboard/summary", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setSummary(res.data);

            } catch (err) {

                console.log(err);
                navigate("/");

            }

        };

        fetchSummary();

    }, [navigate]);

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (

        <div className="container mt-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Expense Controller Dashboard</h2>

                <button
                    className="btn btn-danger"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

            <div className="row">

                <div className="col-md-4 mb-3">

                    <div className="card shadow">

                        <div className="card-body text-center">

                            <h5>Total Expense</h5>

                            <h3>₹ {summary.totalExpense}</h3>

                        </div>

                    </div>

                </div>

                <div className="col-md-4 mb-3">

                    <div className="card shadow">

                        <div className="card-body text-center">

                            <h5>Total Transactions</h5>

                            <h3>{summary.totalTransactions}</h3>

                        </div>

                    </div>

                </div>

                <div className="col-md-4 mb-3">

                    <div className="card shadow">

                        <div className="card-body text-center">

                            <h5>Highest Expense</h5>

                            <h3>₹ {summary.highestExpense}</h3>

                        </div>

                    </div>

                </div>

            </div>

            <hr />

            <div className="text-center">

                <button
                    className="btn btn-success me-3"
                    onClick={() => navigate("/add-expense")}
                >
                    Add Expense
                </button>

                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/expenses")}
                >
                    View Expenses
                </button>

            </div>

        </div>

    );

}

export default Dashboard;