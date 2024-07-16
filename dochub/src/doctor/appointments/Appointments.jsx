import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../api/Api";
import { Button } from "react-bootstrap";
import Navigation from "../navigation/Navigation";
import "./Appointments.css";

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const profile = JSON.parse(localStorage.getItem("profile"));

    const fetchAppointments = async () => {
        try {
            const response = await Api.get(
                `doctor/appointments/${profile.email}`
            );
            setAppointments(response.data);
            setFilteredAppointments(response.data);
        } catch (error) {
            setErrorMsg((prevMsg) => `${prevMsg} ${error.message}`);
            console.log(error.message);
        }
    };

    useEffect(() => {
        if (!profile || !profile.email) {
            navigate("/login");
            return;
        }
        fetchAppointments();
    }, []);

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        const filtered = appointments.filter((appointment) =>
            appointment.client.name.toLowerCase().includes(searchTerm)
        );
        setFilteredAppointments(filtered);
    };

    const handleRowClick = (appointment) => {
        setSelectedAppointment(appointment);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedAppointment(null);
    };

    const updateAppointmentStatus = async (updatedAppointment) => {
        try {
            const response = await Api.put(
                `/doctor/editAppointmentStatus`,
                updatedAppointment
            );
            return response.data;
        } catch (error) {
            setErrorMsg((prevMsg) => `${prevMsg} ${error.message}`);
            console.log(error.message);
            return null;
        }
    };

    const handleMark = async () => {
        const updatedAppointment = { ...selectedAppointment, status: "done" };
        const result = await updateAppointmentStatus(updatedAppointment);
        if (result) {
            setAppointments((prev) =>
                prev.map((appointment) =>
                    appointment.id === result.id ? result : appointment
                )
            );
            setFilteredAppointments((prev) =>
                prev.map((appointment) =>
                    appointment.id === result.id ? result : appointment
                )
            );
            handleCloseModal();
        }
    };

    const handleUnmark = async () => {
        const updatedAppointment = {
            ...selectedAppointment,
            status: "Skipped",
        };
        const result = await updateAppointmentStatus(updatedAppointment);
        if (result) {
            setAppointments((prev) =>
                prev.map((appointment) =>
                    appointment.id === result.id ? result : appointment
                )
            );
            setFilteredAppointments((prev) =>
                prev.map((appointment) =>
                    appointment.id === result.id ? result : appointment
                )
            );
            handleCloseModal();
        }
    };

    return (
        <>
            <Navigation />
            <div className="hero-container1">
                <div className="d-appointments">
                    <h1>Appointments</h1>
                    <input
                        type="text"
                        placeholder="Search by Client Name"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="d-search-input"
                    />
                    {filteredAppointments.length > 0 ? (
                        <table className="d-appointments-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Client Name</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAppointments.map((item, index) => (
                                    <tr
                                        key={index}
                                        onClick={() => handleRowClick(item)}
                                    >
                                        <td>{index + 1}</td>
                                        <td>{item.client.name}</td>
                                        <td>{item.date}</td>
                                        <td>{item.time}</td>
                                        <td>{item.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div>No appointments found.</div>
                    )}

                    {showModal && selectedAppointment && (
                        <div className="d-modal-overlay">
                            <div className="d-modal-content">
                                <span
                                    className="d-close"
                                    onClick={handleCloseModal}
                                >
                                    &times;
                                </span>
                                <h2>Appointment Details</h2>
                                <p>
                                    <strong>Client Name:</strong>{" "}
                                    {selectedAppointment.client.name}
                                </p>
                                <p>
                                    <strong>Client Email:</strong>{" "}
                                    {selectedAppointment.client.email}
                                </p>
                                <p>
                                    <strong>Client Phone:</strong>{" "}
                                    {selectedAppointment.client.phone}
                                </p>
                                <p>
                                    <strong>Description:</strong>{" "}
                                    {selectedAppointment.description}
                                </p>
                                <p>
                                    <strong>Date:</strong>{" "}
                                    {selectedAppointment.date}
                                </p>
                                <p>
                                    <strong>Time:</strong>{" "}
                                    {selectedAppointment.time}
                                </p>
                                <p>
                                    <strong>Status:</strong>{" "}
                                    {selectedAppointment.status}
                                </p>
                                <Button variant="success" onClick={handleMark}>
                                    Mark as Done
                                </Button>
                                <Button variant="danger" onClick={handleUnmark}>
                                    Skipped
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Appointments;
