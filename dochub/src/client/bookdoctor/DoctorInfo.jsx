/**
 * @file DoctorInfo.jsx
 * @brief Component to display detailed doctor information and allow booking appointments.
 */

import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import { Button, Modal, Container, Row, Col } from "react-bootstrap";
import Api from "../../api/Api";
import "./DoctorInfo.css";
/**
 * @class DoctorInfo
 * @brief Displays detailed information about a doctor and allows booking an appointment.
 */
const DoctorInfo = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Getting the client email from local storage
    // const data = JSON.parse(localStorage.getItem("profile"));
    // const clientEmail = data.email;

    const [profileData, setProfileData] = useState(() => {
        const data = localStorage.getItem("profile");
        return data ? JSON.parse(data) : {};
    });

    const [details, setDetails] = useState({}); // Details of doctor
    const [lgShow, setLgShow] = useState(false); // Bootstrap modal components state
    const [bookingDetails, setBookingDetails] = useState({
        // Details of booking
        description: "",
        time: "",
        date: "",
        status: "pending",
    });

    /**
     * @brief Handle input field changes for booking details.
     * @param {Object} e Event object.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingDetails((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    /**
     * @brief Set doctor details from location state on component mount.
     */
    useEffect(() => {
        if (location.state) {
            setDetails(location.state);
        }
        return () => {};
    }, [location.state]);

    /**
     * @brief API to book appointments
     */
    const bookAppointmentAPI = async () => {
        try {
            const res = await Api.post(
                `/client/bookAppointments/${profileData.email}/${details.email}`,
                bookingDetails
            );
            const returndata = res.data;
        } catch (error) {
            alert(error.message);
        }
    };

    /**
     * @brief Book an appointment and navigate to the home page.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        bookAppointmentAPI();
        setLgShow(false);
        alert(`Appointment booked`);
        navigate("/");
    };
    /**
     * @brief Navigate back to the previous page.
     */
    const handleBack = () => {
        navigate(-1); // Navigate to the previous page
    };
    return (
        <>
            <Header />
            <button onClick={handleBack} className="back-btn">
                &larr; Back
            </button>
            <Container className="my-4 w-100 d-flex align-items-center justify-content-center">
                <Row className="justify-content-center w-100">
                    <Col md={8} lg={6} className="doctor-info-container">
                        <h2 className="text-center">Doctor Information</h2>
                        <div className="doctor-info">
                            <p>
                                <strong>Name:</strong> {details.name}
                            </p>
                            <p>
                                <strong>Email:</strong> {details.email}
                            </p>
                            <p>
                                <strong>Phone:</strong> {details.phone}
                            </p>
                            <p>
                                <strong>Address:</strong> {details.address}
                            </p>
                            <p>
                                <strong>Department:</strong>{" "}
                                {details.department}
                            </p>
                            <p>
                                <strong>Schedule:</strong> {details.schedule}
                            </p>
                        </div>
                        <div className="text-center">
                            <Button
                                className="book-appointment-btn"
                                onClick={
                                    localStorage.getItem("profile")
                                        ? () => setLgShow(true)
                                        : () => navigate("/clientlogin")
                                }
                            >
                                Book Appointment
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Book Appointment
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="form" onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Col xs={12} md={6}>
                                Time:{" "}
                                <input
                                    type="time"
                                    name="time"
                                    value={bookingDetails.time}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </Col>
                            <Col xs={12} md={6}>
                                Date:{" "}
                                <input
                                    type="date"
                                    name="date"
                                    value={bookingDetails.date}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                Reason:{" "}
                                <input
                                    type="text"
                                    name="description"
                                    value={bookingDetails.description}
                                    placeholder="Description"
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </Col>
                        </Row>
                        <div className=" w-50 d-flex">
                            <Button className="w-50 h-25 mx-1" type="submit">
                                Book
                            </Button>
                            <Button className="w-50 h-25 mx-1" type="reset">
                                Reset
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default DoctorInfo;
