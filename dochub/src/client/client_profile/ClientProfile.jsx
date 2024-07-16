import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import { useState, useEffect } from "react";
import Api from "../../api/Api";
import "./ClientProfile.css";
import { Button } from "react-bootstrap";

const ClientProfile = () => {
    const [profileData, setProfileData] = useState(() => {
        const data = localStorage.getItem("profile");
        return data ? JSON.parse(data) : {};
    });

    const navigate = useNavigate();

    useEffect(() => {
        // Optional: Additional logic if needed on component mount
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    const handleSave = async () => {
        try {
            const response = await Api.put("/client/profile", profileData);
            localStorage.setItem("profile", JSON.stringify(response.data));
            alert("Profile saved successfully!");
        } catch (error) {
            alert(
                "Failed to save profile: " +
                    (error.response?.data?.message || "Unknown error")
            );
        }
    };

    return (
        <>
            <Header />
            <div className="hero-container1">
                <div className=" d-flex h-100 w-100 justify-content-center align-content-center">
                    <div className="profile-card">
                        <div className="profile-header">
                            <h3>{profileData.name || "Client"}</h3>
                        </div>
                        <div className="profile-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <p className="profile-text">
                                        {profileData.name || "N/A"}
                                    </p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <p className="profile-text">
                                        {profileData.email || "N/A"}
                                    </p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-input"
                                        value={profileData.password || ""}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        className="form-input"
                                        value={profileData.phone || ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="gender">Gender</label>
                                    <p className="profile-text">
                                        {profileData.gender || "N/A"}
                                    </p>
                                </div>
                            </form>
                        </div>
                        <div className="profile-footer">
                            <Button
                                className="p-btn p-btn-save"
                                onClick={handleSave}
                            >
                                Save Profile
                            </Button>
                            <Button
                                className="p-btn p-btn-logout"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClientProfile;
