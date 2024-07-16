import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../api/Api";
import { Link } from "react-router-dom";
import "./Registration.css";

const Registration = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        gender: "",
        department: "",
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

        if (!formData.name) formErrors.name = "Name is required";
        if (!formData.email) formErrors.email = "Email is required";
        if (!formData.password) formErrors.password = "Password is required";
        if (!formData.phone) formErrors.phone = "Phone number is required";
        if (!formData.address) formErrors.address = "Address is required";
        if (!formData.gender) formErrors.gender = "Gender is required";
        if (!formData.department)
            formErrors.department = "Department is required";

        if (
            formData.email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            formErrors.email = "Please enter a valid email address";
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const addNewDoctorAPI = async () => {
        if (validate()) {
            try {
                const res = await Api.post("/doctorRegistration", formData);
                localStorage.setItem("profile", JSON.stringify(res.data));
                navigate("/doctor");
            } catch (error) {
                alert(
                    "Registration failed: " +
                        (error.response?.data?.message || "Unknown error")
                );
            }
        }
        setIsSubmitting(false);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        addNewDoctorAPI();
        setIsSubmitting(true);
    };

    return (
        <div className="registration-container">
            <div className="registration-card">
                <h2>Doctor Registration</h2>
                {Object.keys(errors).length > 0 && (
                    <div className="error-messages">
                        {Object.values(errors).map((err, index) => (
                            <p key={index} className="error-message">
                                {err}
                            </p>
                        ))}
                    </div>
                )}
                <form
                    onSubmit={handleSubmit}
                    aria-labelledby="registration-form"
                >
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
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
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
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
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            placeholder="Enter your address"
                            aria-required="true"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                            aria-required="true"
                        >
                            <option value="">Select...</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="department">Department</label>
                        <input
                            type="text"
                            id="department"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            required
                            placeholder="Enter your department"
                            aria-required="true"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`btn ${isSubmitting ? "btn-disabled" : ""}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Register"}
                    </button>
                </form>
                <Link to="/login" className="login-link">
                    Already have an account? Login
                </Link>
                <Link to="/clientlogin" className="login-link">
                    Login as user
                </Link>
            </div>
        </div>
    );
};

export default Registration;
