import React, { useState } from "react";
import { Accordion, Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addRoom } from "../../../actions/dorm";
import { LinkContainer } from 'react-router-bootstrap';


const initialState = {floor: 0, apartment: '', count: 6};

const Building = ({dorm}) => {
    const [addRoomModal, setAddRoomModal] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState(initialState);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormErrors({...formErrors, [e.target.name]: ''});
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const handleSubmit = (e) =>{
        e.preventDefault();

        if(!formData.apartment){
            setFormErrors({...formErrors, apartment: 'Write room name'});
        }else{
            dispatch(addRoom({...formData, building: dorm._id}));
            closeAddModal();
        }
    }

    const openAddModal = (e) =>{
        setFormData({...formData, floor: e.target.value});
        setAddRoomModal(true);
    }
    const closeAddModal = () => setAddRoomModal(false);

    return (
        <Accordion.Item eventKey={dorm._id} className="dorm">
            <Modal show={addRoomModal} onHide={closeAddModal}>
                <Modal.Header closeButton >Add Room to Dorm "{dorm.name}"</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="room-form-apartment">
                            <Form.Label>Room Name</Form.Label>
                            <Form.Control type="text" name="apartment" value={formData.apartment} onChange={handleChange} isInvalid={!!formErrors.apartment} />
                            <Form.Control.Feedback type="invalid">{formErrors.apartment}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="room-form-floor">
                            <Form.Label>Floor</Form.Label>
                            <Form.Control type="number" name="floor" min={1} max={dorm.floorCount} value={formData.floor} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="room-form-floor">
                            <Form.Label>Number of tenants for this room</Form.Label>
                            <Form.Control type="number" name="count" min={1} max={10} value={formData.count} onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeAddModal}>Cancel</Button>
                    <Button variant="success" onClick={handleSubmit}>Submit</Button>
                </Modal.Footer>
            </Modal>
            <Accordion.Header>{dorm.name}</Accordion.Header>
            <Accordion.Body>
                <div className="info">
                    <h3>Info</h3>
                    <p>Gender: {dorm.gender}</p>
                    <p>Floor Count: {dorm.floorCount}</p>
                </div>
                <div className="floors">
                    <h3>Rooms</h3>
                    {Array.apply(null, { length: dorm.floorCount }).map((e, i) => (
                        <div className="floor" key={i}>
                            <h4>Floor #{i+1} <Button variant="success" value={i+1} onClick={openAddModal}>Add Room</Button></h4>
                            <Row className="rooms my-3" xs={2} lg={4}>
                                {dorm.rooms.map((room,key) => room.floor === i+1 && (
                                    <Col className="room" key={key}>
                                        <Card>
                                            <Card.Header>
                                                <h5>Room: {room.apartment}</h5>
                                            </Card.Header>
                                            <Card.Body>
                                                <p>Max tenants in room: {room.count}</p>
                                                <p>Left: {room.left}</p>
                                                <div className="tenants">
                                                    <p>Tenants:</p>
                                                    {room.tenants.map((tenant, key)=>(
                                                        <LinkContainer to={`/admin/applicants/${tenant._id}`}  key={key}>
                                                            <div className="tenant">
                                                                {tenant.firstname} {tenant.lastname}
                                                            </div>
                                                        </LinkContainer>
                                                    ))}
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    ))}
                </div>
            </Accordion.Body>
        </Accordion.Item>
    )
};

export default Building;