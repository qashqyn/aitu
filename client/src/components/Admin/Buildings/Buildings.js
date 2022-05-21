import React, { useEffect, useState } from "react";
import { Accordion, Button, Form, Modal, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addBuilding, getDorms } from "../../../actions/dorm";
import Building from "./Building";

import './styles.scss';

const initialState = {name: '', gender: '', floorCount: 0};

const Buildings = () => {
    const {isLoading, dorms} = useSelector((state) => state.dorm);
    const dispatch = useDispatch();

    const [addDormModal, setAddDormModal] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState(initialState);

    useEffect(() => {
        dispatch(getDorms());
    }, [dispatch]);

    const addDorm = (e) => {
        e.preventDefault();
        setAddDormModal(true);
    }
    const closeDormModal = () => {
        setAddDormModal(false);
    }

    const handleChange = (e) =>{
        setFormErrors({...formErrors, [e.target.name]: ''});
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let errCount = 0;
        let errors = initialState;
        if(!formData.name){
            errCount++;
            errors.name = 'Write Dorm Name';
        }else
            errors.name = '';
        if(!formData.gender){
            errCount++;
            errors.gender = 'Choose gender for Dorm';
        }else   
            errors.gender = '';
        if(!formData.floorCount || formData.floorCount === 0){
            errCount++;
            errors.floorCount = 'Floor count must be greater that 0';
        }else   
            errors.floorCount = '';
        
        setFormErrors(errors);

        if(errCount === 0){
            dispatch(addBuilding(formData));
            setAddDormModal(false);
        }

    }

    return(
        <div id="buildings">

            <Modal show={addDormModal} onHide={closeDormModal}>
                <Modal.Header closeButton >Add Dorm</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="form-name">
                            <Form.Label>Dorm Name</Form.Label>
                            <Form.Control type="text" name="name" value={formData.name} isInvalid={!!formErrors.name} onChange={handleChange}/>
                            <Form.Control.Feedback>{formErrors.name}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Gender</Form.Label>
                            <Form.Check type="radio" label="Male" id="gender-male" checked={formData.gender === 'male'} value="male" name="gender" onChange={handleChange} />
                            <Form.Check type="radio" label="Female" id="gender-female" checked={formData.gender === 'female'} value="female" name="gender" onChange={handleChange} />
                            <Form.Control className="d-none" isInvalid={!!formErrors.gender}/>
                            <Form.Control.Feedback>{formErrors.gender}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="form-floor-count">
                            <Form.Label>Floor count</Form.Label>
                            <Form.Control type="number" name="floorCount" min={0} max={100} value={formData.floorCount} isInvalid={!!formErrors.floorCount} onChange={handleChange}/>
                            <Form.Control.Feedback>{formErrors.floorCount}</Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDormModal} >Cancel</Button>
                    <Button variant="success" onClick={handleSubmit} >Submit</Button>
                </Modal.Footer>
            </Modal>

            <h1>Dorms</h1>
            {(!!isLoading) ? (
                <div className="text-center p-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </Spinner>
                </div>
            ) : (
                <div className="dorms">
                    <div className="mb-3">
                        <Button onClick={addDorm}>Add Dorm</Button>
                    </div>
                    {(dorms && dorms.length > 0) ? (
                            <div>
                                <Accordion>

                                    {dorms.map((dorm, key) => (
                                        <Building dorm={dorm} key={key} />
                                    ))}
                                </Accordion>
                            </div>
                    ) : (
                        <div className="text-center">No dorms</div>
                    )}
                </div>
            )}
        </div>
    )
};

export default Buildings;