/* AdminDashboard.js */
import React from "react";
import { useNavigate } from "react-router-dom";
import DoctorList from "../userlist/DoctorList";
import ClientList from "../userlist/ClientList";
import "./AdminDashboard.css"; // Import the CSS file
import { Button } from "react-bootstrap";
const AdminDashboard = () => {
    const data = JSON.parse(localStorage.getItem("profile"));
    const name = data?.name || "Unknown";
    const email = data?.email || "Unknown";
    const navigate = useNavigate();
    //log out
    const handlelogout = () => {
        localStorage.clear();
        navigate("/");
    };
    return (
        <div className="admin-dashboard hero-container2">
            <h1>Admin Dashboard</h1>
            <div className="admin-info">
                <p>
                    <strong>Name:</strong> {name}
                </p>
                <p>
                    <strong>Email:</strong> {email}
                </p>
                <Button className="logout-btn" onClick={handlelogout}>
                    log out
                </Button>
            </div>
            <div className="lists-container">
                <DoctorList />
                <ClientList />
            </div>
        </div>
    );
};

export default AdminDashboard;
