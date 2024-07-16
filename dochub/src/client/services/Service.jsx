import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../../api/Api";
import Header from "../header/Header";
import "./Service.css";
import Table from "react-bootstrap/Table";
// import { Button } from "react-bootstrap";

const Service = () => {
    const [departments, setDepartments] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredDepartments, setFilteredDepartments] = useState([]);
    const [sortOrder, setSortOrder] = useState("a-z");

    const fetchDepartments = async () => {
        try {
            const res = await Api.get("/client/getDepartments/");
            setDepartments(res.data);
            setFilteredDepartments(res.data);
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        fetchDepartments();
        return () => {};
    }, []);

    useEffect(() => {
        const sortedDepartments = [...departments].sort((a, b) => {
            return sortOrder === "a-z"
                ? a.localeCompare(b)
                : b.localeCompare(a);
        });
        setFilteredDepartments(
            sortedDepartments.filter((department) =>
                department.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
        return () => {};
    }, [searchQuery, departments, sortOrder]);

    return (
        <>
            <Header />
            <div className="services hero-container1">
                <div className="container department card ">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search departments..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="form-control"
                        />
                        <p>sort by</p>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="sort-select"
                        >
                            <option value="a-z">A-Z</option>
                            <option value="z-a">Z-A</option>
                        </select>
                    </div>
                    <Table responsive borderless>
                        <thead>
                            <tr style={{ fontSize: "1.5rem",fontWeight:"bold" }}>Departments</tr>
                        </thead>
                        <tbody>
                            {filteredDepartments.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <Link
                                            to="/doctorlist"
                                            state={item}
                                            className="item-link"
                                        >
                                            {item}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
};

export default Service;
