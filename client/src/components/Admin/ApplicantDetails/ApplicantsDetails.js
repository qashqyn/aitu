import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApplicant,changeStatus } from "../../../actions/dorm";
import { Button, Col, Modal, Row, Spinner, Table } from 'react-bootstrap';
import moment from 'moment';
import { useParams } from "react-router-dom";


import './styles.scss';

const ApplicantDetails = () => {
    const { data: applicant, isLoading, status: resStatus } = useSelector((state)=>state.dorm);
    const dispatch = useDispatch();
    const { id } = useParams();    

    const [showCW, setShowCW] = useState(false);
    const [newStatus, setNewStatus] = useState('');

    const changeAppStatus = (e) => {
        e.preventDefault();
        setNewStatus(e.target.value);
        setShowCW(true);
    }

    const closeModal = () => {
        setShowCW(false);
    }

    const handleConfirm = () => {
        closeModal();
        dispatch(changeStatus(id, {...applicant, status: newStatus}));
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

            {(!!isLoading) ? (
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
                                <p>Status: <span className={applicant.status}>{applicant.status}</span></p>
                            </div>
                        </Col>
                        {applicant.docs.length>0 && (
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
                        <Button variant="success" value="approved" onClick={changeAppStatus}>Approve</Button>
                        <Button variant="danger" value="dissmissed" onClick={changeAppStatus}>Dismiss</Button>
                        <Button variant="warning" value="waiting" onClick={changeAppStatus}>Wait</Button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ApplicantDetails;