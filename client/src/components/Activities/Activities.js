import React, { useEffect } from "react";
import { Carousel, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { getActivities } from "../../actions/activities";
import moment from "moment";

import ActivitiesImg1 from '../../images/Activities1.png';
import Carousel2 from '../../images/carousel2.png';
import Carousel3 from '../../images/carousel3.png';
import Carousel4 from '../../images/carousel4.png';

import './styles.scss';

const carouselItems = [ActivitiesImg1, Carousel2, Carousel3, Carousel4];

const Activities = () => {
    const { data: activities, isLoading } = useSelector((state) => state.activity);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getActivities());
    }, [dispatch]);

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
                        <div className="text-center p-5">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Загрузка...</span>
                            </Spinner>
                        </div>
                    ) : (activities && activities.length>0) ? (
                            <Row xs={1} md={2} lg={3} className="activity-cards">
                                {activities.map((activity, key) => (
                                    <Col key={key}>
                                        {activity.link ? (
                                            <a href={activity.link} target="_blank">
                                                <div className="activity-card">
                                                    <Image src={activity.image} />
                                                    <div className="activity-card-title">
                                                        <h3>{activity.date && (`${moment(activity.date).format('DD.MM.YYYY')} - `)}{activity.title}</h3>
                                                    </div>
                                                </div>
                                            </a>
                                        ) : (
                                            <div className="activity-card">
                                                <Image src={activity.image} />
                                                <div className="activity-card-title">
                                                    <h3>{activity.date && (`${moment(activity.date).format('DD.MM.YYYY')} - `)}{activity.title}</h3>
                                                </div>
                                            </div>
                                        )}
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <div className="text-center p-5">
                                <h3>No activities yet</h3>
                            </div>
                        )
                    }
            </Container>
        </div>
    )
};

export default Activities;