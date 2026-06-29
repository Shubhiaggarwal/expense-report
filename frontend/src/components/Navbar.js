import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">

                <Link className="navbar-brand" to="/dashboard">

                    Expense Controller

                </Link>

                <div className="collapse navbar-collapse">

                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">

                            <Link className="nav-link" to="/dashboard">

                                Dashboard

                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link className="nav-link" to="/expenses">

                                Expenses

                            </Link>

                        </li>

                        <li className="nav-item">

                            <Link className="nav-link" to="/add-expense">

                                Add Expense

                            </Link>

                        </li>

                        <li className="nav-item">

                            <button
                                className="btn btn-danger ms-3"
                                onClick={logout}
                            >
                                Logout
                            </button>

                        </li>

                    </ul>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;