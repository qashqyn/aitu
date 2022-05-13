import React from "react";
import { Col, Nav, Row } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { Outlet } from "react-router-dom";

const Admin = () => {
    return (
        <div id="admin">
            <Row>
                <Col xs={2}>
                    <Nav>

                        <LinkContainer to="applicants">
                            <Nav.Link>Applicants List</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Col>
                <Col xs={10}>
                   <Outlet/>
                </Col>
            </Row>
        </div>
    );
};

export default Admin;