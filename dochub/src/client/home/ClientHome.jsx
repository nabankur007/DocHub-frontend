import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import Header from "../header/Header";
// import { useEffect } from "react";
import "./ClientHome.css";

const ClientHome = () => {
    const navigate = useNavigate();
    return (
        <>
            <Header />
            <div className="hero-container1 home">
                <div className="hero-content">
                    <h1 className="hero-title">Welcome to Dochub.com</h1>
                    <p className="hero-subtitle">
                        We provide the easy service to book nearest doctors.
                    </p>
                    <Button variant="danger" onClick={()=>navigate("/service")}  className="hero-button">
                        Our Services
                    </Button>
                </div>
            </div>
        </>
    );
};

export default ClientHome;
