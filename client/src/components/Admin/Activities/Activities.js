import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row, Spinner, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FileBase64 from 'react-file-base64';
import moment from 'moment';

import NoImg from '../../../images/no-image.png';

import { createActivity, getActivities, deleteActivity } from "../../../actions/activities";

import './styles.scss';

const initialState = {title: '', image: '', date: '', text: '', link: ''};

const Activities = () => {
    const {data: activities, isLoading} = useSelector((state) => state.activity);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getActivities());
    },[dispatch]);

    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState(initialState);

    const [createModal, setCreateModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const openCreateModal = () => setCreateModal(true);
    const closeCreateModal = () => setCreateModal(false);

    const openDeleteModal = (e) => setDeleteId(e.target.value);
    const closeDeleteModal = () => setDeleteId(null);

    const handleChange = (e) => {
        setFormErrors({...formErrors, [e.target.name]: ''});
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        let errCnt = 0;
        var errs = initialState;
        if(formData.image.length===0){
            errCnt++;   
            errs.image = 'Select Preview Image of Activity';
        }else
            errs.image = '';
        if(formData.title.length===0){
            errCnt++;   
            errs.title = 'Write title of Activity';
        }else
            errs.title = '';

        setFormErrors(errs);
        if(errCnt === 0){
            setFormData(initialState);
            setFormErrors(initialState);
            closeCreateModal();
            dispatch(createActivity(formData));
        }
    }

    const deleteActivityBtn = () =>{
        if(deleteId){
            dispatch(deleteActivity(deleteId));
            closeDeleteModal();
        }
    }

    return (
        <div id="activities">
            <Modal show={createModal} onHide={closeCreateModal} centered size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Create New Activity</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col xs={12} lg={3}>
                                <Form.Group>
                                    <div id="image-preview">
                                        <Image src={formData.image ? formData.image : NoImg} />
                                    </div>
                                    <Form.Label id="form-image" className="btn btn-primary mt-2">Select Preview Image
                                        <FileBase64 multiple={false}  
                                            onDone={({ base64, type }) => {
                                                if(type.includes('image/')){
                                                    setFormErrors({...formErrors, image: ''});
                                                    setFormData({ ...formData, image: base64 });
                                                }else{
                                                    setFormErrors({...formErrors, image: 'Select file typy of image (.png, .jpeg, .jpg)'})
                                                }
                                            }}
                                        />
                                    </Form.Label>
                                    <br/>
                                    <Form.Control isInvalid={!!formErrors.image} className="d-none" />
                                    <Form.Control.Feedback type="invalid">{formErrors.image}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={12} lg={9}>
                                <Form.Group controlId="form-title">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} isInvalid={formErrors.title}/>
                                    <Form.Control.Feedback type="invalid">{formErrors.title}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="form-text">
                                    <Form.Label>Text <span className="text-secondary">(optional)</span></Form.Label>
                                    <Form.Control as="textarea" rows={5} name="text" value={formData.text} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row xs={1} md={2}>
                            <Col>
                                <Form.Group controlId="form-link">
                                    <Form.Label>Link <span className="text-secondary">(optional)</span></Form.Label>
                                    <Form.Control type="url" placeholder="example.com" name="link" value={formData.link} onChange={handleChange}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="form-date">
                                    <Form.Label>Date <span className="text-secondary">(optional)</span></Form.Label>
                                    <Form.Control type="date" name="date" value={formData.date} onChange={handleChange}/>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeCreateModal}>Cancel</Button>
                    <Button variant="success" onClick={handleSubmit}>Create</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={deleteId} onHide={closeDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Activity</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>You want to delete activity?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDeleteModal}>Cancel</Button>
                    <Button variant="danger" onClick={deleteActivityBtn}>Delete</Button>
                </Modal.Footer>
            </Modal>

            <h1>Activities</h1>
            <div className="d-flex">
                <Button variant="success" onClick={openCreateModal}>Create Activity</Button>
            </div>
            {(isLoading || !activities) ? (
                <div className="text-center p-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </Spinner>
                </div>
            ) : (activities && activities.length>0) ? (
                    <Row xs={1} md={2} lg={4} className="mt-3">
                        {activities.map((activity, key) => (
                            <Col key={key}>
                                <Card className="h-100">
                                    <Card.Img variant="top" src={activity.image} />
                                    <Card.Body>
                                        <Card.Title>{activity.title}</Card.Title>
                                        <Card.Text>{activity.text}</Card.Text>
                                        {activity.link && (
                                            <Card.Link href={activity.link} target="_blank" >{activity.link}</Card.Link>
                                            )}
                                        {activity.date && (
                                            <p className="date">{moment(activity.date).format('DD.MM.YYYY')}</p>
                                            )}
                                        <div className="btns">

                                            <Button variant="danger" value={activity._id} onClick={openDeleteModal}>Delete</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>    
                ) : (
                    <div className="p-5 text-center">
                        No activities
                    </div>  
                )
            }
        </div>
    );
}

export default Activities;