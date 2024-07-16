import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import Api from "../../api/Api";
import "./ClientLogin.css";

const ClientLogin = () => {
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
            const res = await Api.post("/clientLogin", credentials);
            localStorage.setItem("profile", JSON.stringify(res.data));

            navigate("/");
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
        <Container className="login-container d-flex justify-content-center align-items-center">
            <Row className="justify-content-center">
                <Col md={6} lg={4} className="login-form p-4">
                    <h3 className="text-center mb-4">User Login Details</h3>

                    <Form onSubmit={handleSubmit}>
                        {error && (
                            <div className="alert alert-danger text-center">
                                {error}
                            </div>
                        )}
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="email"
                                name="email"
                                value={credentials.email}
                                placeholder="Email Address"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 position-relative">
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={credentials.password}
                                placeholder="Password"
                                onChange={handleChange}
                                required
                            />
                            <span
                                className="password-toggle position-absolute top-50 end-0 translate-middle-y me-2"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </span>
                        </Form.Group>
                        <Button
                            type="submit"
                            className="w-100 btn-primary mb-3"
                        >
                            Login
                        </Button>
                        <div className="text-center">
                            <small>
                                Don't have an account?{" "}
                                <Link to="/clientsignup" className="link">
                                    Sign Up
                                </Link>
                            </small>
                            <br />

                            <small>
                                <Link to="/login" className="link">
                                    Login as Doctor
                                </Link>
                            </small>
                            <br />
                            <small>
                                <Link to="/adminlogin" className="link">
                                    Admin Login
                                </Link>
                            </small>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ClientLogin;
