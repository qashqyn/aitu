import React from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/Navbar/NavBar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Activities from "./components/Activities/Activities";
import Clubs from "./components/Clubs/Clubs";
import Registration from "./components/Registration/Registration";
import Study from "./components/Study/Study";
import Teaching from "./components/Study/Teaching/Teaching";
import StudyOptions from "./components/Study/Options/Options";

import 'bootstrap/dist/css/bootstrap.min.css';
import './main.scss';
import Admin from "./components/Admin/Admin";
import Applicants from "./components/Admin/Applicants/Applicants";
import ApplicantDetails from "./components/Admin/ApplicantDetails/ApplicantsDetails";
import Buildings from "./components/Admin/Buildings/Buildings";
import AdminActivities from "./components/Admin/Activities/Activities";

const App = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <div id="main-content">
                <Routes>
                    <Route path="/" exact element={<Home />}/>
                    <Route path="/registration" exact element={<Registration />}/>
                    <Route path="/about" exact element={<About />}/>
                    <Route path="/study" exact element={<Study />}/> 
                    <Route path="/study/teaching" exact element={<Teaching />}/> 
                    <Route path="/study/options" exact element={<StudyOptions />}/> 
                    <Route path="/activities" exact element={<Activities />}/>
                    <Route path="/clubs" exact element={<Clubs />}/>
                    <Route path="/admin" element={<Admin />}>
                        <Route path="" element={<Navigate to="applicants" replace />} />
                        <Route path="*" element={<Navigate to="applicants" replace />} />
                        <Route path="applicants" element={<Applicants />} />
                        <Route path="applicants/:id" element={<ApplicantDetails />} />
                        <Route path="dorms" element={<Buildings />} />
                        <Route path="activities" element={<AdminActivities />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
            <Footer />
        </BrowserRouter>
    );
};  

export default App;