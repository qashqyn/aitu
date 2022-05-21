import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApplicant,changeStatus, getDorms } from "../../../actions/dorm";
import { Button, Col, Form, Modal, Row, Spinner, Table } from 'react-bootstrap';
import moment from 'moment';
import { useParams } from "react-router-dom";


import './styles.scss';

const initialState = {building: '', floor: '', room: ''};

const ApplicantDetails = () => {
    const { data: applicant, isLoading, status: resStatus, dorms } = useSelector((state)=>state.dorm);
    const dispatch = useDispatch();
    const { id } = useParams();    

    const [showCW, setShowCW] = useState(false);
    const [newStatus, setNewStatus] = useState('');
    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState(initialState);

    const changeAppStatus = (e) => {
        e.preventDefault();
        setNewStatus(e.target.value);
        dispatch(getDorms());
        setShowCW(true);
    }

    const closeModal = () => {
        setShowCW(false);
    }

    const handleFormChange = (e) => {
        setFormErrors({});
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleConfirm = () => {
        if(newStatus === 'approved'){
            let errCnt = 0;
            let errs = initialState;
            
            if(!formData.building){
                errCnt++;
                errs.building = 'Please Select Dorm';
            }
            if(!formData.floor){
                errCnt++;
                errs.floor = 'Please Select Floor';
            }
            if(!formData.room){
                errCnt++;
                errs.room = 'Please Select Room';
            }

            setFormErrors(errs);

            if(errCnt === 0){
                closeModal();
                setFormErrors({...formErrors, room: ''});
                dispatch(changeStatus(id, {...applicant, status: newStatus, room: formData.room}));
            }
        }else{
            closeModal();
            setFormErrors({...formErrors, room: ''});
            dispatch(changeStatus(id, {...applicant, status: newStatus}));
        }

    }

    const handleCancel = () => {
        closeModal();
    }

    const [isError, setIsError] = useState(false);
    const closeErrorModal = () => {
        setIsError(false);
    }
    useEffect(() => {
        if(resStatus){
            switch(resStatus){
                case 204: 
                    window.location.reload();
                    break;
                case 500:
                case 404:
                    setIsError(true);
                    break;
                default:
                    break;
            }
        }
    }, [resStatus])

    const base64toBlob = (data) => {
        // Cut the prefix `data:application/pdf;base64` from the raw base 64
        const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);
    
        const bytes = atob(base64WithoutPrefix);
        let length = bytes.length;
        let out = new Uint8Array(length);
    
        while (length--) {
            out[length] = bytes.charCodeAt(length);
        }
    
        return new Blob([out], { type: 'application/pdf' });
    };
    const [curFile, setCurFile] = useState(null);

    const showFile = (e) => {
        e.preventDefault();
        setCurFile(applicant.docs[e.currentTarget.dataset.index]);
    }
    const closeFilePreview = () => {
        setCurFile(null);
    }

    useEffect(()=>{
        dispatch(getApplicant(id));
    }, [dispatch, id]);


    return (
        <div id="applicant-details">
            <Modal className="filePreview" show={curFile} onHide={closeFilePreview} fullscreen centered>
                {!!curFile && (
                    <>
                        <Modal.Header closeButton>{curFile.name}</Modal.Header>
                        <Modal.Body>
                            {curFile.type === 'application/pdf' ? (
                                <iframe src={URL.createObjectURL(base64toBlob(curFile.file))}></iframe>
                            ) : (
                                <iframe src={curFile.file}></iframe>
                            )}
                        </Modal.Body>
                    </>
                )}
            </Modal>
            <Modal show={showCW} onHide={closeModal} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Do you want to change status to <span className={newStatus}>{newStatus}</span>?</Modal.Title>
                </Modal.Header>
                {newStatus === 'approved' && (
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Select Dorm</Form.Label>
                                <Form.Select name="building" onChange={handleFormChange} defaultValue={formData.building}>
                                    <option value="">Dorm</option>
                                    {dorms && dorms.map((dorm, key) => dorm.leftOnBuilding > 0 && (
                                            <option key={key} value={dorm._id}>{dorm.name}, Left: {dorm.leftOnBuilding}</option>
                                        )
                                    )}
                                </Form.Select>
                                <Form.Control className="d-none" isInvalid={!!formErrors.building} />
                                <Form.Control.Feedback type="invalid">{formErrors.building}</Form.Control.Feedback>
                            </Form.Group>
                            {formData.building && (
                                <Form.Group>
                                    <Form.Label>Select Floor</Form.Label>
                                    <Form.Select name="floor" onChange={handleFormChange} defaultValue={formData.floor}>
                                        <option value="">Floor</option>
                                        {dorms && dorms.map((dorm) => dorm._id === formData.building &&
                                            Array.apply(null, { length: dorm.floorCount }).map((e, i) => dorm.leftOnFloor[i+1] > 0 && (
                                                    <option key={i} value={i+1}>{i+1}, Left: {dorm.leftOnFloor[i+1]}</option>
                                                )
                                            )
                                        )}
                                    </Form.Select>
                                    <Form.Control className="d-none" isInvalid={!!formErrors.floor} />
                                    <Form.Control.Feedback type="invalid">{formErrors.floor}</Form.Control.Feedback>
                                </Form.Group>
                            )}
                            {formData.building && formData.floor && (
                                <Form.Group>
                                    <Form.Label>Select Room</Form.Label>
                                    <Form.Select name="room" onChange={handleFormChange} defaultValue={formData.room}>
                                        <option value="">Room</option>
                                        {dorms && dorms.map((dorm) => 
                                            dorm.rooms.map((room, key) => (room.floor === Number(formData.floor) && room.left > 0 && applicant.room?._id !== room._id) && (
                                                <option key={key} value={room._id}>{room.apartment}, Left: {room.left}</option>
                                            ))
                                        )}
                                    </Form.Select>
                                    <Form.Control className="d-none" isInvalid={!!formErrors.room} />
                                    <Form.Control.Feedback type="invalid">{formErrors.room}</Form.Control.Feedback>
                                </Form.Group>
                            )}
                        </Form>
                    </Modal.Body>
                )}
                <Modal.Footer>
                    <Button variant="success" onClick={handleConfirm}>Confirm</Button>
                    <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                </Modal.Footer>
            </Modal>
            <Modal className="errorModal" show={isError} onHide={closeErrorModal} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>Something went wrong. Please try again later.</Modal.Body>
            </Modal>

            {(!!isLoading || !applicant) ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </Spinner>
                </div>
            ) : (
                <div>
                    <h1>Applicant Details</h1>
                    <Row xs={1} lg={2}>
                        <Col>
                            <h2>{applicant.firstname + " " + applicant.lastname}</h2>
                            <h5>{applicant.email}</h5>
                            <div>
                                <p>Year: <span>{applicant.year}</span></p>
                                <p>Disabled: <span>{applicant.isDisabled ? 'Yes' : 'No'}</span></p>
                                <p>Orphan: <span>{applicant.isOrphan ? 'Yes' : 'No'}</span></p>
                                <p>Incomplete Family: <span>{applicant.fromIncompleteFamily ? 'Yes' : 'No'}</span></p>
                                <p>Large Family: <span>{applicant.fromLargeFamily ? 'Yes' : 'No'}</span></p>
                                <p>Gender: <span>{applicant.gender}</span></p>
                                <p>Status: <span className={applicant.status}>{applicant.status}</span></p>
                                {applicant.room && (
                                    <>
                                        <p>Dorm: <span>{applicant.room.building.name}</span></p>
                                        <p>Room: <span>{applicant.room.apartment}</span></p>
                                    </>
                                )}
                            </div>
                        </Col>
                        {(applicant.docs && applicant.docs.length>0) && (
                            <Col>
                                <h5>Supporting files:</h5>
                                <div id="file-preview">
                                    {applicant.docs.map((doc, key) => (                                    
                                        <div className="preview" key={key}>
                                            <span data-index={key} onClick={showFile}>
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 64C0 28.65 28.65 0 64 0H224V128C224 145.7 238.3 160 256 160H384V448C384 483.3 355.3 512 320 512H64C28.65 512 0 483.3 0 448V64zM256 128V0L384 128H256z"/></svg>
                                                </div>
                                                <p>{doc.name}</p>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </Col>
                        )}
                    </Row>
                    <div className="buttons">
                        <Button variant="success" value="approved" onClick={changeAppStatus}>{applicant.status==='approved' ? ('Change room') : ('Approve')}</Button>
                        <Button variant="danger" value="dissmissed" onClick={changeAppStatus}>Dismiss</Button>
                        <Button variant="warning" value="waiting" onClick={changeAppStatus}>Wait</Button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ApplicantDetails;