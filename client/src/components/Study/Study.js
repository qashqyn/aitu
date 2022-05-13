import React from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";

import StudyWithUsImg from '../../images/StudyWithUs.png'
import StudyOptionsImg from '../../images/StudyOptions.png'
import TeachingAndLearningImg from '../../images/TeachingAndLearning.png'

import './styles.scss';
import { LinkContainer } from "react-router-bootstrap";


const Study = () => {
    return (
        <div id="study">
            <Container>
                <Row xs={1} lg={2}>
                    <Col>
                        <Image src={StudyWithUsImg} />
                    </Col>
                    <Col>
                        <h3>Studying at university in 2021-22</h3>
                        <p>
                            We want to reassure you that you'll get the best experience possible at AITU – with the supportive, inclusive learning environment you'd expect and full access to all our student services.
                        </p>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Img variant="top" src={StudyOptionsImg} />
                            <Card.Body>
                                <Card.Title>Study options</Card.Title>
                                <Card.Text>Study with your friends and groupmates</Card.Text>
                                <div>
                                    <LinkContainer to="/study/options">
                                        <Card.Link>Options</Card.Link>
                                    </LinkContainer>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Img variant="top" src={TeachingAndLearningImg} />
                            <Card.Body>
                                <Card.Title>Teaching and learning</Card.Title>
                                <Card.Text>Class teaching is supported by online technologies: find out more about some of these resources.</Card.Text>
                                <div>
                                    <LinkContainer to="/study/teaching">
                                        <Card.Link>About program</Card.Link>
                                    </LinkContainer>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Study;