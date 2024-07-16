import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../api/Api";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));
    };

    const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const login = async () => {
        if (!credentials.email || !credentials.password) {
            setError("Email and password are required.");
            return;
        }
        if (!isEmailValid(credentials.email)) {
            setError("Please enter a valid email address.");
            return;
        }

        try {
            const res = await Api.post("/doctorLogin", credentials);
            localStorage.setItem("profile", JSON.stringify(res.data));
            navigate("/doctor");
            alert("you are logged in");
        } catch (error) {
            setError(
                "Login failed: " +
                    (error.response?.data?.message || "Invalid user details")
            );
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        login();
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Doctor Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit} aria-labelledby="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                            aria-required="true"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                                placeholder="Enter your password"
                                aria-required="true"
                            />
                            <i
                                className="fa-regular fa-eye"
                                onMouseDown={togglePasswordVisibility}
                                onMouseUp={togglePasswordVisibility}
                                onMouseLeave={() => setShowPassword(false)}
                            ></i>
                        </div>
                    </div>
                    <button type="submit" className="btn">
                        Login
                    </button>
                </form>
                <Link to="/registration" className="register-link">
                    Register as a doctor
                </Link>
                <Link to="/clientlogin" className="register-link m-1">
                    Login as user
                </Link>
            </div>
        </div>
    );
};

export default Login;
