import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

const Header = () => {
    const navigate = useNavigate();
    return (
        <Navbar sticky="top" collapseOnSelect expand="lg" data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">
                    <Image src="/public/dochub.jpeg" width={80} rounded />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" className="custom-nav-link">
                            Home
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/contact"
                            className="custom-nav-link"
                        >
                            Contact
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/service"
                            className="custom-nav-link"
                        >
                            Service
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/about"
                            className="custom-nav-link"
                        >
                            About
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        {localStorage.getItem("profile") ? (
                            <>
                            <Nav.Link
                                as={Link}
                                to="/bookings"
                                className="nav-link custom-nav-link"
                            >
                               Bookings
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/clientprofile"
                                className="nav-link custom-nav-link"
                            >
                                <i className="fa-solid fa-circle-user"></i>{" "}
                                Profile
                            </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Button
                                    className="mx-1"
                                    onClick={() => navigate("/clientlogin")}
                                >
                                    Login
                                </Button>
                                <Button
                                    className="mx-1"
                                    onClick={() => navigate("/clientsignup")}
                                >
                                    SignUp
                                </Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
export default Header;
