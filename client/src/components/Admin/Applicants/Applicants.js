import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeRegistration, getApplicants, openRegistration } from "../../../actions/dorm";
import { LinkContainer } from 'react-router-bootstrap';

import { Button, ButtonGroup, Form, Modal, Spinner, Table } from 'react-bootstrap';
import moment from 'moment';

import './styles.scss';

const formInitials = {start: '', end: ''};
const errorsInitials = {start: '', end: '', main: ''};

const Applicants = () => {
    const { data: applicants, isLoading, regTime, totalLeft } = useSelector((state)=>state.dorm);
    const dispatch = useDispatch();
    const [status, setStatus] = useState('all');
    const [openModal, setOpenModal] = useState(false);
    const [changeModal, setChangeModal] = useState(false);

    const today = moment(new Date()).format('YYYY-MM-DD');

    const [formData, setFormData] = useState(formInitials);
    const [errors, setErrors] = useState(errorsInitials);

    const fetchApplicants = (e) => {
        e.preventDefault();
        setStatus(e.target.value);        
    }

    const openReg = (e) => {
        e.preventDefault();
        setOpenModal(true);
    }

    const closeModal = () => setOpenModal(false);

    const openChangeModal = (e) => {
        e.preventDefault();
        setChangeModal(true);
    }
    const closeChangeModal = () => setChangeModal(false);

    const handleOpenFormChange = (e) => {
        e.preventDefault();
        setErrors({...errors, [e.target.name]: ''});
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errCnt = 0;        
        if(formData.end && formData.start){
            if(formData.end <= formData.start){
                setErrors({...errors, main: 'Start date should be before End date'});
                errCnt++;
            }else{
                setErrors({...errors, main: ''});
            }
        }
        if(!formData.end){
            errCnt++;
            setErrors({...errors, end: 'Choose the ending date'});
        }
        if(!formData.start){
            errCnt++;
            setErrors({...errors, start: 'Choose the starting date'});
        }

        if(errCnt === 0){
            if(changeModal === true){
                dispatch(changeRegistration(formData));
                setChangeModal(false);
            }else if(openModal === true){
                dispatch(openRegistration(formData));
                setOpenModal(false);
            }
        }
    }

    useEffect(()=>{
        dispatch(getApplicants(status));
    }, [dispatch, status]);
    return (
        <div id="applicants-list">
            <Modal show={openModal} onHide={closeModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        Set Registration Period
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="form-main">
                            <Form.Control className="d-none" isInvalid={errors.main} />
                            <Form.Control.Feedback type="invalid">{errors.main}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="form-start">
                            <Form.Label>Start</Form.Label>
                            <Form.Control type="date" min={moment(new Date()).format('YYYY-MM-DD')} name="start" isInvalid={errors.start} onChange={handleOpenFormChange} />
                            <Form.Control.Feedback type="invalid">{errors.start}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="form-end">
                            <Form.Label>End</Form.Label>
                            <Form.Control type="date" min={moment(new Date()).format('YYYY-MM-DD')} name="end" isInvalid={errors.end} onChange={handleOpenFormChange}/>
                            <Form.Control.Feedback type="invalid">{errors.end}</Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                    <Button variant="success" onClick={handleSubmit} >Submit</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={changeModal} onHide={closeChangeModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        Change Registration Period
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="form-main">
                            <Form.Control className="d-none" isInvalid={errors.main} />
                            <Form.Control.Feedback type="invalid">{errors.main}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="form-start">
                            <Form.Label>Start</Form.Label>
                            <Form.Control type="date" min={moment(new Date()).format('YYYY-MM-DD')} name="start" isInvalid={errors.start} onChange={handleOpenFormChange} />
                            <Form.Control.Feedback type="invalid">{errors.start}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="form-end">
                            <Form.Label>End</Form.Label>
                            <Form.Control type="date" min={moment(new Date()).format('YYYY-MM-DD')} name="end" isInvalid={errors.end} onChange={handleOpenFormChange}/>
                            <Form.Control.Feedback type="invalid">{errors.end}</Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeChangeModal}>Cancel</Button>
                    <Button variant="success" onClick={handleSubmit} >Submit</Button>
                </Modal.Footer>
            </Modal>

            <div className="pb-3">
                <h1 className="text-center" >Applicants List</h1>
                {(regTime && totalLeft) ?  
                    (<>
                    {regTime ? (
                        <div className="text-center">
                            {(moment(regTime.start).format('YYYY-MM-DD') <= today && regTime.end > moment(regTime.end).format('YYYY-MM-DD') && totalLeft > 0) ? (
                                <div>Registration is  <span className="text-success">Open</span></div>
                            ) : (
                                <div>Registration is <span className="text-danger">Closed</span></div>
                            ) }
                            Registration period: {moment(regTime.start).format('YYYY-MM-DD') + "  -  " + moment(regTime.end).format('YYYY-MM-DD')}
                            <br/>
                            <Button variant="warning" className="reg-change" onClick={openChangeModal}>Change registration period</Button>
                        </div>
                    ) : (
                        <div> 
                            Registration period is not set
                            <Button onClick={openReg}>Set Dates</Button>
                        </div>
                    )}
                    {totalLeft && (
                        <div className="text-center">
                            Total left: {totalLeft}
                        </div>
                    )} 
                    </>
                    ) : (
                    <div className="text-center p-3">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Загрузка...</span>
                        </Spinner>
                    </div>
                )}
            </div>
            <div className="text-center pb-3">
                <ButtonGroup>
                    <Button variant="secondary" value='all' onClick={fetchApplicants} >All</Button>
                    <Button variant="success" value='approved'  onClick={fetchApplicants} >Approved</Button>
                    <Button variant="danger" value='dissmissed' onClick={fetchApplicants} >Dissmissed</Button>
                    <Button variant="warning" value='waiting' onClick={fetchApplicants} >Waiting</Button>
                </ButtonGroup>
            </div>

            {(!isLoading && applicants) ? 
                (applicants.length>0) ? (
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Gender</th>
                                <th>Year</th>
                                <th>Disabled</th>
                                <th>Orphan</th>
                                <th>Incomplete Family</th>
                                <th>Large Family</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applicants && applicants.map((applicant, key) => (
                                <LinkContainer key={key} to={applicant._id}>
                                    <tr>
                                        <td>{key+1}</td>
                                        <td>{applicant.firstname}</td>
                                        <td>{applicant.lastname}</td>
                                        <td>{applicant.gender}</td>
                                        <td>{applicant.year}</td>
                                        <td className={applicant.isDisabled+""}>{applicant.isDisabled ? 'Yes' : 'No'}</td>
                                        <td className={applicant.isOrphan+""}>{applicant.isOrphan ? 'Yes' : 'No'}</td>
                                        <td className={applicant.fromIncompleteFamily+""}>{applicant.fromIncompleteFamily ? 'Yes' : 'No'}</td>
                                        <td className={applicant.fromLargeFamily+""}>{applicant.fromLargeFamily ? 'Yes' : 'No'}</td>
                                        <td>{moment(applicant.createdAt).format('DD/MMMM/YYYY, HH:mm')}</td>
                                        <td className={applicant.status}>{applicant.status}</td>
                                    </tr>
                                </LinkContainer>
                                ))
                            }
                        </tbody>
                    </Table>
                ): (
                    <div>
                        No Applicants
                    </div>
                )
             : (
                <div className="text-center p-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </Spinner>
                </div>
            )}
            </div>
            );
};

export default Applicants;