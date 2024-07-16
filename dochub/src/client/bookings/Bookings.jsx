import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Api from "../../api/Api";
import { Table } from "react-bootstrap";
import { Modal } from "react-bootstrap";

const Bookings = () => {
    // [1] Define state variables for appointments list, selected appointment, and modal visibility
    const [appointmentslist, setAppointmentslist] = useState([]); // appointments list
    const [selectedAppointment, setSelectedAppointment] = useState(null); // selected appointment details
    const [lgShow, setLgShow] = useState(false); // modal visibility

    // [2] Get the user email from localStorage
    const profile = JSON.parse(localStorage.getItem("profile"));
    const userEmail = profile ? profile.email : "";

    // [3] Function to fetch the appointment list
    const fetchAppointmentList = async () => {
        try {
            const res = await Api.get(`/client/appointments/${userEmail}`);
            setAppointmentslist(res.data); // update appointments list state
        } catch (error) {
            alert(error.message); // show error message
        }
    };

    // [4] Handle row click to show appointment details in a modal
    const handleRowClick = (appointment) => {
        setSelectedAppointment(appointment); // set selected appointment details
        setLgShow(true); // show modal
    };

    // [5] Fetch appointments when the component mounts
    useEffect(() => {
        if (userEmail) {
            fetchAppointmentList(); // fetch appointment list
        }
    }, [userEmail]); // dependency array includes userEmail

    return (
        <>
            <Header /> {/* [6] Render header component */}
            <div className="hero-container1">
                <h1 className="text-center ">Bookings</h1>
                {/* [7] Render title */}
                {appointmentslist.length > 0 ? (
                    <Table borderless responsive className="">
                        {/* [8] Render appointments table */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Doctor Name</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointmentslist.map((item, index) => (
                                <tr
                                    key={index}
                                    onClick={() => handleRowClick(item)} // [9] Handle row click
                                    style={{ cursor: "pointer" }} // [10] Change cursor to pointer
                                >
                                    <td>{index + 1}</td>
                                    <td>{item.doctor.name}</td>
                                    <td>{item.date}</td>
                                    <td>{item.time}</td>
                                    <td>{item.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <div className="text-center">No appointments found.</div> // [11] Show message if no appointments found
                )}
                {selectedAppointment && (
                    <Modal
                        centered
                        size="lg"
                        show={lgShow} // [12] Show modal if lgShow is true
                        onHide={() => {
                            setLgShow(false); // [13] Hide modal
                            setSelectedAppointment(null); // [14] Clear selected appointment
                        }}
                        aria-labelledby="example-modal-sizes-title-lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">
                                <h2>Appointment Details</h2>
                                {/* [15] Modal title */}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>
                                <strong>Doctor Name:</strong>
                                {selectedAppointment.doctor.name}
                                {/* [16] Doctor name */}
                            </p>
                            <p>
                                <strong>Doctor Email:</strong>
                                {selectedAppointment.doctor.email}
                                {/* [17] Doctor email */}
                            </p>
                            <p>
                                <strong>Doctor Phone:</strong>
                                {selectedAppointment.doctor.phone}
                                {/* [18] Doctor phone */}
                            </p>
                            <p>
                                <strong>Description:</strong>
                                {selectedAppointment.description}
                                {/* [19] Appointment description */}
                            </p>
                            <p>
                                <strong>Date:</strong>{" "}
                                {selectedAppointment.date}
                                {/* [20] Appointment date */}
                            </p>
                            <p>
                                <strong>Time:</strong>{" "}
                                {selectedAppointment.time}
                                {/* [21] Appointment time */}
                            </p>
                            <p>
                                <strong>Status:</strong>
                                {selectedAppointment.status}
                                {/* [22] Appointment status */}
                            </p>
                        </Modal.Body>
                    </Modal>
                )}
            </div>
        </>
    );
};

export default Bookings;
