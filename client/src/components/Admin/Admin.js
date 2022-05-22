import React, { useEffect, useState } from "react";
import { Col, Nav, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { LinkContainer } from 'react-router-bootstrap';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LOGOUT } from "../../constants/actionTypes";
import decode from 'jwt-decode';

import Login from "./Auth/Login/Login";


import './styles.scss';

const Admin = () => {
    const dispatch = useDispatch();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const location = useLocation();
    const navigate = useNavigate();

    const logout = () => {
        dispatch({ type: LOGOUT });
        navigate('/admin');
        setUser(null);
    }


    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
      
            if (decodedToken.exp * 1000 < new Date().getTime()) 
                logout();
        }
      
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <div id="admin">
            {user ? (
                <Row>
                    <Col xs={2}>
                        <Nav className="flex-column">
                            <LinkContainer to="activities">
                                <Nav.Link>Activities</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="applicants">
                                <Nav.Link>Applicants List</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="dorms">
                                <Nav.Link>Dorms</Nav.Link>
                            </LinkContainer>
                            <Nav.Link onClick={logout} >Log out</Nav.Link>
                        </Nav>
                    </Col>
                    <Col xs={10} className="pb-3">
                    <Outlet/>
                    </Col>
                </Row>
            ) : (
                <Login />
            )}
        </div>
    );
};

export default Admin;