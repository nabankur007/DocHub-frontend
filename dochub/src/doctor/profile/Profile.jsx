import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../api/Api";
import "./Profile.css"; // Ensure this file contains the updated CSS
import Navigation from "../navigation/Navigation";
import { Button } from "react-bootstrap";
const Profile = () => {
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
        navigate("/login");
    };

    const handleSave = async () => {
        try {
            const response = await Api.put("/doctor/profile", profileData);
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
            <Navigation />
            <div className="profile-container hero-container2">
                <div className="profile-card">
                    <div className="profile-header">
                        <h3>{profileData.name || "Doctor"}</h3>
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
                                <label htmlFor="schedule">Schedule</label>
                                <input
                                    type="text"
                                    id="schedule"
                                    name="schedule"
                                    className="form-input"
                                    value={profileData.schedule || ""}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="gender">Gender</label>
                                <p className="profile-text">
                                    {profileData.gender || "N/A"}
                                </p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    className="form-input"
                                    value={profileData.address || ""}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="department">Speciality</label>
                                <p className="profile-text">
                                    {profileData.department || "N/A"}
                                </p>
                            </div>
                        </form>
                    </div>
                    <div className="profile-footer">
                        <Button
                            variant="success"
                            className="btn btn-save m-2"
                            onClick={handleSave}
                        >
                            Save Profile
                        </Button>
                        <Button
                            variant="danger"
                            className="btn btn-logout m-2"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
