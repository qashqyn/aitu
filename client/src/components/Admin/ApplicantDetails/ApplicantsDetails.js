import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApplicant,changeStatus } from "../../../actions/dorm";
import { Button, Modal, Spinner, Table } from 'react-bootstrap';
import moment from 'moment';
import { useParams } from "react-router-dom";


import './styles.scss';

const ApplicantDetails = () => {
    const { data: applicant } = useSelector((state)=>state.dorm);
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

    useEffect(()=>{
        dispatch(getApplicant(id));
        setNewStatus(applicant?.status);
    }, [dispatch, id]);
    return (
        <div id="applicant-details">
            <Modal show={showCW} onHide={closeModal} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Do you want to change status to <span className={newStatus}>{newStatus}</span>?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="success" onClick={handleConfirm}>Confirm</Button>
                    <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                </Modal.Footer>
            </Modal>

            {!!applicant ? (
                <div>
                    <h1>Applicant Details</h1>
                    <h2>{applicant.firstname + " " + applicant.lastname}</h2>
                    <div>
                        <p>Status: <span className={applicant.status}>{applicant.status}</span></p>
                    </div>
                    <div>
                        <Button variant="success" value="approved" onClick={changeAppStatus}>Approve</Button>
                        <Button variant="danger" value="dissmissed" onClick={changeAppStatus}>Dismiss</Button>
                        <Button variant="warning" value="waiting" onClick={changeAppStatus}>Wait</Button>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </Spinner>
                </div>
            )}

        </div>
    );
};

export default ApplicantDetails;