import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./doctor/home/Home";
import Registration from "./doctor/registration/Registration";
import Login from "./doctor/login/Login";
import Profile from "./doctor/profile/Profile";
import Appointments from "./doctor/appointments/Appointments";
import ClientLogin from "./client/client_login/ClientLogin";
import ClientSignup from "./client/client_signup/ClientSignup";
import ClientHome from "./client/home/ClientHome";
import ClientProfile from "./client/client_profile/ClientProfile";
import Contact  from "./client/contact/Contact";
import Service from "./client/services/Service";
import DoctorList from "./client/doctorlist/DoctorList";
import DoctorInfo from "./client/bookdoctor/DoctorInfo";
import Booking from "./client/bookdoctor/Booking";
import AdminLogin from "./admin/adminlogin/AdminLogin";
import AdminDashboard from "./admin/admindashboard/AdminDashboard";
import Bookings from "./client/bookings/Bookings";
import About from "./client/aboutus/About";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* client */}
                <Route path="/" element={<ClientHome />} />
                <Route path="/clientlogin" element={<ClientLogin />} />
                <Route path="/clientsignup" element={<ClientSignup />} />
                <Route path="/clientprofile" element={<ClientProfile />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/service" element={<Service />} />
                <Route path="/doctorlist" element={<DoctorList />} />
                <Route path="/doctorinfo" element={<DoctorInfo />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/about" element={<About />} />
                
                {/* doctor */}
                <Route path="/doctor" element={<Home />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/appointments" element={<Appointments />} />

                {/* admin */}
                <Route path="/adminlogin" element={<AdminLogin />} />
                <Route path="/admindashboard" element={<AdminDashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
