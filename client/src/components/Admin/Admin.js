import React, { useState } from "react";
import { Col, Nav, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { LinkContainer } from 'react-router-bootstrap';
import { Outlet } from "react-router-dom";
import { LOGOUT } from "../../constants/actionTypes";
import Login from "./Auth/Login/Login";

import './styles.scss';

const Admin = () => {
    const dispatch = useDispatch();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () => {
        dispatch({ type: LOGOUT });
        setUser(null);
    }

    return (
        <div id="admin">
            {user ? (
                <Row>
                    <Col xs={2}>
                        <Nav className="flex-column">
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