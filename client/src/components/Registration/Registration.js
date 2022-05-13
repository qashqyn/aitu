import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { registerToDorm } from '../../actions/dorm';

import './styles.scss';

const initalState = {firstname: '', lastname: '', year: '', fromLargeFamily: false, isDisabled: false, fromIncompleteFamily: false, isOrphan: false};
const errorsInitial = {firstname:'',lastname:'', year:''};

const Registration = () => {
    const { status } = useSelector((state) => state.dorm);
    const [formData, setFormData] = useState(initalState);
    const [errors, setErrors] = useState(errorsInitial);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        if(e.target.type === 'checkbox'){
            setFormData({...formData, [e.target.name]: e.target.checked});
        }else{
            setFormData({...formData, [e.target.name]: e.target.value});
        }
    }

    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const closeSuccessModal = () => {
        setFormData(initalState);
        setIsSuccess(false);
    }
    const closeErrorModal = () => {
        setIsError(false);
    }

    useEffect(()=>{
        if(!!status){
            switch (status) {
                case 201:
                    setIsSuccess(true);
                    break;
                case 409:
                    setIsError(true);
                    break;
                default:
                    break;
            }
        }
    }, [dispatch, status])

    const handleSubmit = (e) => {
        e.preventDefault();

        let errorCount = 0;

        let errorss = {firstname:'',lastname:'', year:''};

        if(!formData.firstname){
            errorCount ++;
            errorss.firstname = 'Write your First Name';
        }else
            errorss.firstname = '';

        if(!formData.lastname){
            errorCount ++;
            errorss.lastname = 'Write your Last Name';
        }else
            errorss.lastname = '';

        if(!formData.year){
            errorCount ++;
            errorss.year = 'Choose your year of study';
        }else
            errorss.year = '';

        setErrors(errorss);

        if(errorCount === 0)
            dispatch(registerToDorm(formData));
    }

    return (
        <div id="registration">
            <Container>
                <Modal className="successModal" show={isSuccess} onHide={closeSuccessModal} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>You successfully registered for AITU dorm.</Modal.Body>
                </Modal>
                <Modal className="errorModal" show={isError} onHide={closeErrorModal} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Something went wrong. Please try later.</Modal.Body>
                </Modal>
                <h1 className="text-center">Registration to Dorm</h1>
                <Form onSubmit={handleSubmit}>
                    <Row xs={1} md={2}>
                        <Col>
                            <Form.Group controlId="form-firstname">
                                <Form.Label>Firstname</Form.Label>
                                <Form.Control type="text" name="firstname" value={formData.firstname} onChange={handleChange} isInvalid={!!errors.firstname} />
                                <Form.Control.Feedback type="invalid">{errors.firstname}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="form-lastname">
                                <Form.Label>Lastname</Form.Label>
                                <Form.Control type="text" name="lastname" value={formData.lastname} onChange={handleChange}  isInvalid={!!errors.lastname} />
                                <Form.Control.Feedback type="invalid">{errors.lastname}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="form-year">
                        <Form.Label>Choose your year</Form.Label>
                        <Form.Select name="year" value={formData.year} onChange={handleChange}  isInvalid={!!errors.year} >
                            <option value="">Choose your year</option>
                            <option value="1 year">1 year</option>
                            <option value="2 year">2 year</option>
                            <option value="3 year">3 year</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Сhoose the answers that suits you</Form.Label>
                        <Form.Check name="fromLargeFamily" id="form-fromLargeFamily" checked={formData.fromLargeFamily} onChange={handleChange} label="You are from large family(4 childen under 18)" />
                        <Form.Check name="isDisabled" id="form-isDisabled" checked={formData.isDisabled} onChange={handleChange} label="You are disabled" />
                        <Form.Check name="fromIncompleteFamily" id="form-fromIncompleteFamily" checked={formData.fromIncompleteFamily} onChange={handleChange} label="You are from an incomplete family" />
                        <Form.Check name="isOrphan" id="form-isOrphan" checked={formData.isOrphan} onChange={handleChange} label="You are an orphan" />
                    </Form.Group>
                    <Button type="submit">Submit</Button>
                </Form>
            </Container>
        </div>
    );
};

export default Registration;