import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Api from "../../api/Api";
import { Card, Row, Col, Container } from "react-bootstrap";

const DoctorList = () => {
    const location = useLocation();
    const [department, setDepartment] = useState("");
    const [doctorList, setDoctorList] = useState([]);
    const navigate = useNavigate();
    const fetchDoctorList = async () => {
        try {
            const res = await Api.get(`/getDoctorList/${department}`);
            setDoctorList(res.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        if (location.state) {
            setDepartment(location.state);
        }
        return () => {};
    }, [location.state]);

    useEffect(() => {
        if (department) {
            fetchDoctorList();
        }
        return () => {};
    }, [department]);

    /**
     * @brief Navigate back to the previous page.
     */
    const handleBack = () => {
        navigate(-1); // Navigate to the previous page
    };

    return (
        <>
            <Header />
            <button
                onClick={handleBack}
                className="back-btn"
                style={{
                    outline: "none",
                    border: "none",
                    color: "blue",
                    padding: "5px",
                }}
            >
                &larr; Back
            </button>
            <h1 className="text-center fw-bold">{department}</h1>
            <Container className="my-4 ">
                <Row>
                    {doctorList.map((item, index) => (
                        <Col key={index} md={4} className="mb-4">
                            <Card
                                bg="secondary"
                                border="secondary"
                                text="light"
                                className="h-100 shadow-lg"
                                style={{ width: "18rem" }}
                            >
                                <Card.Header>
                                    <Card.Title
                                        style={{ fontWeight: "bolder" }}
                                    >
                                        {item.name}
                                    </Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text
                                        style={{
                                            fontSize: "0.9rem",
                                            lineHeight: "1.3rem",
                                        }}
                                    >
                                        {item.address}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Card.Link as={Link} to="/doctorinfo" state={item} className="btn w-50">
                                        see more
                                    </Card.Link>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default DoctorList;
