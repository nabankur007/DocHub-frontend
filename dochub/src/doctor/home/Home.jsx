import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../navigation/Navigation";
import { Button } from "react-bootstrap";
import "./Home.css";  // Make sure to create this file

const Home = () => {
    return (
        <>
            <Navigation />
            <div className="bg-image hero-container1">
                <div className="content">
                    <h1>Welcome to Dochub</h1>
                    <p>Your digital hub for managing medical appointments and records. Simplify your healthcare experience with just a few clicks.</p>
                    <Link to="/appointments">
                        <Button variant="warning" className="btn-check-appointments">Check Appointments</Button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Home;
