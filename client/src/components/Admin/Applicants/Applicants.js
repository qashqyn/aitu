import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApplicants } from "../../../actions/dorm";
import { LinkContainer } from 'react-router-bootstrap';

import { Button, Spinner, Table } from 'react-bootstrap';
import moment from 'moment';

import './styles.scss';

const Applicants = () => {
    const { data: applicants } = useSelector((state)=>state.dorm);
    const dispatch = useDispatch();
    const [status, setStatus] = useState('all');

    const fetchApplicants = (e) => {
        e.preventDefault();
        setStatus(e.target.value);        
    }

    useEffect(()=>{
        dispatch(getApplicants(status));
    }, [dispatch, status]);
    return (
        <div id="applicants-list">
            <Button variant="secondary" value='all' onClick={fetchApplicants} >All</Button>
            <Button variant="success" value='approved'  onClick={fetchApplicants} >Approved</Button>
            <Button variant="danger" value='dissmissed' onClick={fetchApplicants} >Dissmissed</Button>
            <Button variant="warning" value='waiting' onClick={fetchApplicants} >Waiting</Button>

            {(applicants && applicants.length > 0) ? (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
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
                        {
                        applicants.map((applicant, key) => (
                            <LinkContainer key={key} to={applicant._id}>
                                <tr>
                                    <td>{key+1}</td>
                                    <td>{applicant.firstname}</td>
                                    <td>{applicant.lastname}</td>
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

export default Applicants;