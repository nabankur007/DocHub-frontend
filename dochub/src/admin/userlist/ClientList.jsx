/* ClientList.js */
import React, { useState, useEffect } from "react";
import Api from "../../api/Api";
import { Table, Button, FormControl, Modal } from "react-bootstrap";

const ClientList = () => {
    const [clientList, setClientList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedClient, setSelectedClient] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchClientlist = async () => {
        try {
            const res = await Api.get("/admin/getClient");
            setClientList(res.data);
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        fetchClientlist();
        return () => {};
    }, [selectedClient]);

    const handleViewClick = (client) => {
        setSelectedClient(client);
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
                `/admin/deleteclient/${selectedClient.email}`
            );
            alert(res.data);
            fetchClientlist(); // Refresh the doctor list after deletion
        } catch (error) {
            alert(error.message);
        }
    };

    const filteredClients = clientList.filter(
        (client) =>
            client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.phone?.includes(searchTerm)
    );

    return (
        <div className="list-container">
            <h2>Client List</h2>
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClients.slice(0, 10).map((item, index) => (
                            <tr key={index} >
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
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
                    <Modal.Title>Client Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedClient && (
                        <div>
                            <p>
                                <strong>Name:</strong> {selectedClient.name}
                            </p>
                            <p>
                                <strong>Email:</strong> {selectedClient.email}
                            </p>
                            <p>
                                <strong>Gender:</strong> {selectedClient.gender}
                            </p>
                            <p>
                                <strong>Phone:</strong> {selectedClient.phone}
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

export default ClientList;
