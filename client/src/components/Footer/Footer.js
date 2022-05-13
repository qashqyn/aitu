import React from "react";
import { LinkContainer } from 'react-router-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube, faFacebookSquare } from '@fortawesome/free-brands-svg-icons'

import { Nav } from "react-bootstrap";

import './styles.scss';

const Footer = () => {
    return (
        <div id="footer">
            <Nav>
                <Nav.Item>
                    <span>Get in touch</span>
                    <div className="icons">
                        <a href="http://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href="http://youtube.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faYoutube} />
                        </a>
                        <a href="http://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebookSquare} />
                        </a>
                    </div>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="https://astanait.edu.kz/" target="_blank">https://astanait.edu.kz/</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="tel:8-707-000-00-00">8-707-000-00-00</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>  
    );
};

export default Footer;