import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";

import './styles.scss';

import AboutImg1 from '../../images/about1.png'
import AboutImg2 from '../../images/about2.png'
import AboutImg3 from '../../images/about3.png'

const About = () => {
    return (
        <div id="about">
            <Container>
                <Image src={AboutImg1} />
                <Row>
                    <Col xs={12} lg={7} className="col order-lg-2">
                        <Image src={AboutImg2} />
                    </Col>
                    <Col xs={12} lg={5} className="col order-lg-1">
                        <h3>Aitu campus</h3>
                        <p>
                            Aitu campus is a chanse for students to live with student life. Students can attend on different activities and study camps.
                            <br/>We partner with quality companies like Cisco, Huawei and another organises and hosts the Gap Year programmes.
                        </p>
                    </Col>
                    <Col xs={12} lg={7} className="col order-lg-3">
                        <Image src={AboutImg3} />
                    </Col>
                    <Col xs={12} lg={5} className="col order-lg-4">
                        <h3>Aitu campus staff</h3>
                        <p>
                            Our staff is a people with degrees and with a long achievement list.
                            <br/>Our staff not work only in educational work they are enjoys literature and the theatre, is an avid reader of history and a keen hill walker and cyclist.
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default About;