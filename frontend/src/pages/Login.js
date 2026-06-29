import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const res = await API.post("/users/login", {
                email,
                password
            });

            localStorage.setItem("token", res.data.token);

            toast.success("Login Successful");

            navigate("/dashboard");

        }

        catch (err) {

            toast.error(err.response?.data?.message || "Login Failed");

        }

    };

    return (

        <div className="container">

            <div
                className="row justify-content-center align-items-center"
                style={{ minHeight: "100vh" }}
            >

                <div className="col-md-5">

                    <div className="card shadow-lg">

                        <div className="card-header bg-primary text-white text-center">

                            <h2>Expense Controller</h2>

                        </div>

                        <div className="card-body">

                            <h4 className="text-center mb-4">

                                Login

                            </h4>

                            <form onSubmit={handleLogin}>

                                <div className="mb-3">

                                    <label>Email</label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>Password</label>

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control"
                                        placeholder="Enter Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />

                                </div>

                                <div className="form-check mb-3">

                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={showPassword}
                                        onChange={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    />

                                    <label className="form-check-label">

                                        Show Password

                                    </label>

                                </div>

                                <button
                                    className="btn btn-primary w-100"
                                >

                                    Login

                                </button>

                            </form>

                            <div className="text-center mt-3">

                                Don't have an account?

                                <Link
                                    to="/register"
                                    className="ms-2"
                                >

                                    Register

                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;