import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ExpenseList from "./pages/ExpenseList";
import AddExpense from "./pages/AddExpense";
import EditExpense from "./pages/EditExpense";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                {/* Public Route */}
                <Route
                    path="/"
                    element={<Login />}
                />

                {/* Protected Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />

                {/* Protected Add Expense */}
                <Route
                    path="/add-expense"
                    element={
                        <PrivateRoute>
                            <AddExpense />
                        </PrivateRoute>
                    }
                />

                {/* Protected Expense List */}
                <Route
                    path="/expenses"
                    element={
                        <PrivateRoute>
                            <ExpenseList />
                        </PrivateRoute>
                    }
                />

                {/* Protected Edit Expense */}
                <Route
                    path="/edit-expense/:id"
                    element={
                        <PrivateRoute>
                            <EditExpense />
                        </PrivateRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;