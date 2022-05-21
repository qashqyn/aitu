import React, { useEffect } from "react";
import { Carousel, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { getActivities } from "../../api";

import ActivitiesImg1 from '../../images/Activities1.png';
import Carousel2 from '../../images/carousel2.png';
import Carousel3 from '../../images/carousel3.png';
import Carousel4 from '../../images/carousel4.png';

import './styles.scss';

const carouselItems = [ActivitiesImg1, Carousel2, Carousel3, Carousel4];

const Activities = () => {
    const activities = null;
    const isLoading = true;
    // const { activities } = useSelector((state) => state.activities);
    // const { isLoading } = useSelector((state) => state.dorm);
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(getActivities());
    // }, [dispatch]);

    return (
        <div id="activities">
            <Container>
                <div id="carousel">
                    <Carousel>  
                        {carouselItems.map((item, key) => (
                            <Carousel.Item key={key}>
                                <img className="d-block w-100" src={item} />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <div className="carousel-bottom">
                        <h3>
                            AITU activities - our univerity orgonize different activities. 
                            <br/>Participate it and have a good time 
                        </h3>
                    </div>
                </div>
                    {(isLoading && !activities) ? (
                        <div className="text-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Загрузка...</span>
                            </Spinner>
                        </div>
                    ) : (
                        <Row xs={1} md={2} className="activity-cards">
                            {activities.map((activity, key) => (
                                <Col key={key}>
                                    <a href={activity.link} target="_blank">
                                        <div className="activity-card">
                                            <Image src={activity.img} />
                                            <div className="activity-card-title">
                                                <h3>{activity.name}</h3>
                                            </div>
                                        </div>
                                    </a>
                                </Col>
                            ))}
                        </Row>
                    )}
            </Container>
        </div>
    )
};

export default Activities;