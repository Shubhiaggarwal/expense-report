import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

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

    return (

        <>

            <Navbar />

            <div className="container mt-4">

                <div className="text-center mb-5">

                    <h1 className="fw-bold">
                        💰 Expense Controller
                    </h1>

                    <p className="text-muted">
                        Manage your daily expenses efficiently
                    </p>

                </div>

                <div className="row">

                    <div className="col-lg-4 col-md-6 mb-4">

                        <div className="card text-white bg-primary shadow-lg border-0">

                            <div className="card-body text-center">

                                <h5>Total Expense</h5>

                                <h2>₹ {summary.totalExpense}</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-4 col-md-6 mb-4">

                        <div className="card text-white bg-success shadow-lg border-0">

                            <div className="card-body text-center">

                                <h5>Total Transactions</h5>

                                <h2>{summary.totalTransactions}</h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-4 col-md-12 mb-4">

                        <div className="card text-dark bg-warning shadow-lg border-0">

                            <div className="card-body text-center">

                                <h5>Highest Expense</h5>

                                <h2>₹ {summary.highestExpense}</h2>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="card shadow mt-4">

                    <div className="card-body">

                        <h4 className="mb-3">

                            Quick Actions

                        </h4>

                        <div className="d-flex flex-wrap gap-3">

                            <button
                                className="btn btn-success"
                                onClick={() => navigate("/add-expense")}
                            >
                                ➕ Add Expense
                            </button>

                            <button
                                className="btn btn-primary"
                                onClick={() => navigate("/expenses")}
                            >
                                📋 View Expenses
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Dashboard;