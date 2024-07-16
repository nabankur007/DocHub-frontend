import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isLoggedIn = localStorage.getItem("profile");

    const handleToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="brand">
                    <img src="/dochub.jpeg" alt="Dochub Logo" className="brand-image" />
                </Link>
                <button className="menu-toggle" onClick={handleToggle}>
                    <span className="sr-only">Toggle navigation</span>
                    <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
                    <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
                    <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
                </button>
                <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    <Link to="/doctor" className="nav-link">Home</Link>
                    <Link to="/appointments" className="nav-link">Appointments</Link>
                    {isLoggedIn ? (
                        <Link to="/profile" className="nav-link">Profile</Link>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/registration" className="nav-link">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
