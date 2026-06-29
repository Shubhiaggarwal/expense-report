import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            await API.post("/users/register", {
                name,
                email,
                password
            });

            toast.success("Registration Successful");

            navigate("/");

        }

        catch (err) {

            toast.error(err.response?.data?.message || "Registration Failed");

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

                        <div className="card-header bg-success text-white text-center">

                            <h2>Expense Controller</h2>

                        </div>

                        <div className="card-body">

                            <h4 className="text-center mb-4">

                                Register

                            </h4>

                            <form onSubmit={handleRegister}>

                                <div className="mb-3">

                                    <label>Name</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Full Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />

                                </div>

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
                                    className="btn btn-success w-100"
                                >

                                    Register

                                </button>

                            </form>

                            <div className="text-center mt-3">

                                Already have an account?

                                <Link
                                    to="/"
                                    className="ms-2"
                                >

                                    Login

                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;