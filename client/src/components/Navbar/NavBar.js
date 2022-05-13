import React from "react";
import { LinkContainer } from 'react-router-bootstrap';

import { Navbar, Nav, Image } from "react-bootstrap";

import './styles.scss';
import Logo from '../../images/aitu-logo.png';
import StudentIcon from '../../images/student-icon.png';

const NavBar = () => {
    return (
        <Navbar collapseOnSelect id="nav-bar">
            <div className="top-nav">
                <LinkContainer to="/">
                    <Image src={Logo} className="logo" />
                </LinkContainer>
                <Nav>
                    <LinkContainer to="/staff">
                        <Nav.Link>
                            <Image src={StudentIcon} />
                            Students and staff
                        </Nav.Link>
                    </LinkContainer>
                </Nav>
            </div>
            <div className="bottom-nav">
                <Navbar.Toggle aria-controls="navbar" />
                <Navbar.Collapse id="navbar">
                    <Nav>
                        <LinkContainer to="/about">
                            <Nav.Link>About us</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/registration">
                            <Nav.Link>Registration to dorm</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/activities">
                            <Nav.Link>Activities</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/clubs">
                            <Nav.Link>AITU clubs</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/study">
                            <Nav.Link>Study with us</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default NavBar;