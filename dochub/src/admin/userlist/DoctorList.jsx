/* DoctorList.js */
import React, { useState, useEffect } from "react";
import Api from "../../api/Api";
import { Table, Button, FormControl, Modal } from "react-bootstrap";

const DoctorList = () => {
    const [doctorList, setDoctorList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Fetch the doctor list from the API
    const fetchDoctorlist = async () => {
        try {
            const res = await Api.get("/admin/getDoctor");
            setDoctorList(res.data);
        } catch (error) {
            alert(error.message);
        }
    };

    // Fetch the doctor list when the component mounts or when selectedDoctor changes
    useEffect(() => {
        fetchDoctorlist();
        return () => {};
    }, [selectedDoctor]);

    // Handle the view button click to show doctor details in a modal
    const handleViewClick = (doctor) => {
        setSelectedDoctor(doctor);
        setShowModal(true);
    };

    // Handle the delete button click
    const handleDelete = () => {
        // Show confirmation dialog before proceeding with deletion
        if (window.confirm("Are you sure you want to delete this doctor?")) {
            handleDeleteApi();
        }
        // Close the modal whether or not the user confirmed
        setShowModal(false);
    };

    // Call the delete API to remove the doctor
    const handleDeleteApi = async () => {
        try {
            const res = await Api.delete(
                `/admin/deletedoctor/${selectedDoctor.email}`
            );
            alert(res.data);
            fetchDoctorlist(); // Refresh the doctor list after deletion
        } catch (error) {
            alert(error.message);
        }
    };

    // Filter the doctors based on the search term
    const filteredDoctors = doctorList.filter(
        (doctor) =>
            doctor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.phone?.includes(searchTerm) ||
            doctor.department?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="list-container ">
            <h2>Doctor List</h2>
            <FormControl
                type="text"
                placeholder="Search"
                className="mb-3"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="table-container">
                <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Department</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDoctors.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.department}</td>
                                <td>
                                    <Button
                                        onClick={() => handleViewClick(item)}
                                    >
                                        View
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Doctor Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedDoctor && (
                        <div>
                            <p>
                                <strong>Name:</strong> {selectedDoctor.name}
                            </p>
                            <p>
                                <strong>Email:</strong> {selectedDoctor.email}
                            </p>
                            <p>
                                <strong>Gender:</strong> {selectedDoctor.gender}
                            </p>
                            <p>
                                <strong>Phone:</strong> {selectedDoctor.phone}
                            </p>
                            <p>
                                <strong>Department:</strong>{" "}
                                {selectedDoctor.department}
                            </p>
                            <p>
                                <strong>Address:</strong>{" "}
                                {selectedDoctor.address}
                            </p>
                            <p>
                                <strong>Schedule:</strong>{" "}
                                {selectedDoctor.schedule}
                            </p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DoctorList;
