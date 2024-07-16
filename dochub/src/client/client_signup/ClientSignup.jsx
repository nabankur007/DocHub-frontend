import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Api from "../../api/Api"; // Ensure this is correctly configured for your endpoints
import "./ClientSignup.css";

const ClientSignUp = () => {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        phone: "",
        password: "",
        gender: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // Handle input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Validate form fields
    const validate = () => {
        let formErrors = {};
        const { email, name, phone, password, confirmPassword, gender } =
            formData;

        // Email validation
        if (!email) formErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            formErrors.email = "Please enter a valid email address";

        // name validation
        if (!name) formErrors.name = "name is required";

        // Phone validation
        if (!phone) formErrors.phone = "Phone number is required";
        else if (!/^\d{10}$/.test(phone))
            formErrors.phone = "Please enter a valid 10-digit phone number";

        // Password validation
        if (!password) formErrors.password = "Password is required";
        else if (password.length < 6)
            formErrors.password = "Password must be at least 6 characters long";

        // Gender validation
        if (!gender) formErrors.gender = "Gender is required";

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setIsSubmitting(true);

        if (validate()) {
            try {
                const res = await Api.post("/clientRegistration", formData);
                localStorage.setItem("profile", JSON.stringify(res.data));
                alert("Registraion successful");
                navigate("/");
            } catch (error) {
                alert(
                    "Registration failed: " +
                        (error.response?.data?.message || "Unknown error")
                );
            }
        }
        setIsSubmitting(false);
    };

    return (
        <div className="registration-container">
            <div className="registration-card">
                <h2>Client Sign Up</h2>
                {Object.keys(errors).length > 0 && (
                    <div className="error-messages">
                        {Object.values(errors).map((err, index) => (
                            <p key={index} className="error-message">
                                {err}
                            </p>
                        ))}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your name"
                            aria-required="true"
                        />
                        {errors.name && (
                            <p className="error-message">{errors.name}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                            aria-required="true"
                        />
                        {errors.email && (
                            <p className="error-message">{errors.email}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="Enter your phone number"
                            aria-required="true"
                        />
                        {errors.phone && (
                            <p className="error-message">{errors.phone}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter your password"
                            aria-required="true"
                        />
                        {errors.password && (
                            <p className="error-message">{errors.password}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select your gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.gender && (
                            <p className="error-message">{errors.gender}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className={`btn ${isSubmitting ? "btn-disabled" : ""}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Sign Up"}
                    </button>
                </form>
                <Link to="/clientlogin" className="login-link">
                    Already have an account? Login
                </Link>
            </div>
        </div>
    );
};

export default ClientSignUp;
