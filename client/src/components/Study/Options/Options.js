import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";

import './styles.scss';

import OptionsImg from '../../../images/study-options.png';
import StudyWithUsImg from '../../../images/StudyWithUs.png'


const StudyOptions = () => {
    return (
        <div id="study-options">
            <Container>
                <div id="options-top-img">
                    <Image src={OptionsImg} />
                    <h1>STUDY OPTIONS</h1>
                </div>
                <Row xs={1} lg={2} className="mb-5">
                    <Col>
                        <Image src={StudyWithUsImg} />
                    </Col>
                    <Col>
                        <h3>Study  in Foreign contries with academic mobility</h3>
                        <p>
                            Academic mobility is important for personal development, it fosters respect for diversity and enables cultural enrichment.  Within the framework of the program of academic mobility.
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default StudyOptions;