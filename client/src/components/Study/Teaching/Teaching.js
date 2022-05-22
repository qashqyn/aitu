import React from "react";
import { Container, Image } from "react-bootstrap";

import CourseraImg from '../../../images/coursera.png'
import CiscoImg from '../../../images/cisco.png'

import './styles.scss';


const Teaching = () => {
    return (
        <div id="teaching">
            <Container>
                <h1>STUDY WITH AITU COURSES</h1>
                <a href="https://www.coursera.org/" target="_blank">
                    <Image src={CourseraImg} />
                </a>
                <a href="https://www.netacad.com/"  target="_blank">
                    <Image src={CiscoImg} />
                </a>
            </Container>
        </div>
    );
};

export default Teaching;