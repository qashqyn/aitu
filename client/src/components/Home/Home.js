import React from "react";
import { LinkContainer } from 'react-router-bootstrap';

import { Col, Container, Image, Row, Carousel } from "react-bootstrap";

import './styles.scss';

import ImgCard1 from '../../images/imageCard1.png';
import ImgCard2 from '../../images/imageCard2.png';
// icons
import ruskinIcon from '../../images/ruskin-icon.png';
import icpcIcon from '../../images/icpc-icon.png';
import researchIcon from '../../images/researches-icon.png';
import healthIcon from '../../images/health-icon.png';
import hackatonIcon from '../../images/hackatons-icon.png';
import sustainabilityIcon from '../../images/sustainability-icon.png';
// carousel
import Carousel1 from '../../images/carousel1.png';

const whyAITU = [
    {img: ruskinIcon, title: 'Ruskin Modules', description: 'Work with students from other courses to tackle challenges, and develop your professional skills.'},
    {img: icpcIcon, title: 'Prepare for ICPC with students', description: 'Our university supports students on their way.'},
    {img: researchIcon, title: 'Make Researches', description: 'Our university supports students on their way.'},
    {img: healthIcon, title: 'Health and wellbeing', description: 'Be healthy, with active lifestyle and gym sessions in AITU.'},
    {img: hackatonIcon, title: 'Participate in defferent competitions and hackatons', description: 'Develop yourself with groupmates and students'},
    {img: sustainabilityIcon, title: 'Sustainability', description: `We're incorporating sustainability and environmental awareness into every aspect of university life.`},
];

const carouselItems = [Carousel1];

const Home = () => {
    return (
       <div id="home">
            <Container>
                <Carousel>
                    {carouselItems.map((item, key) => (
                        <Carousel.Item key={key}>
                            <img className="d-block w-100" src={item} />
                        </Carousel.Item>
                    ))}
                </Carousel>
                <Row md={2} className="img-cards">
                    <Col>
                        <div className="img-card">
                            <Image src={ImgCard1} />
                            <div className="title">AITU ICPC<br/>CODE CHALLENGE</div>
                        </div>
                    </Col>
                    <Col>
                        <div className="img-card">
                            <Image src={ImgCard2} />
                            <div className="title">AITU REWIND</div>
                        </div>
                    </Col>
                </Row>
                <h1>Why AITU?</h1>
                <Row md={2} className="why-cards">
                    {whyAITU.map((el, key) => (
                        <div className="why-card" key={key}>
                            <Image src={el.img} />
                            <div className="desc">
                                <h2>{el.title}</h2>
                                <p>{el.description}</p>
                            </div>
                        </div>
                    ))}
                </Row>
           </Container>
       </div>
    );
};

export default Home;