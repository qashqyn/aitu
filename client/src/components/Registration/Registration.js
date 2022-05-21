import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { getRegTime, registerToDorm } from '../../actions/dorm';
import FileBase64 from 'react-file-base64';
import moment from "moment";

import './styles.scss';

const initalState = {firstname: '', lastname: '', email: '', year: '', gender: '', fromLargeFamily: false, isDisabled: false, fromIncompleteFamily: false, isOrphan: false, docs: []};
const errorsInitial = {firstname:'',lastname:'', year:'', email: '', gender: '', docs: ''};

const Registration = () => {
    const { status, regTime, totalLeft } = useSelector((state) => state.dorm);
    const [formData, setFormData] = useState(initalState);
    const [errors, setErrors] = useState(errorsInitial);
    const [hasDoc, setHasDoc] = useState(false);
    const [docs, setDocs] = useState([]);
    const dispatch = useDispatch();

    const [curFile, setCurFile] = useState(null);

    const handleChange = (e) => {
        if(e.target.type === 'checkbox'){
            setFormData({...formData, [e.target.name]: e.target.checked});
        }else{
            setErrors({...errors, [e.target.name]: ''});
            setFormData({...formData, [e.target.name]: e.target.value});
        }
    }

    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const today = moment(new Date()).format('YYYY-MM-DD');
    // const today = '2022-05-19';

    const closeSuccessModal = () => {
        setFormData(initalState);
        setIsSuccess(false);
    }
    const closeErrorModal = () => {
        setIsError(false);
    }

    useEffect(() => {
        let cnt = 0;
        if(formData.fromIncompleteFamily === true)
            cnt++;
        if(formData.fromLargeFamily === true)
            cnt++;
        if(formData.isDisabled === true)
            cnt++;
        if(formData.isOrphan === true)
            cnt++;
        if(cnt === 0){
            setHasDoc(false);   
            setDocs([]);
        }else{
            setHasDoc(true);   
        }
    }, [formData]);

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
    }, [dispatch, status]);
    useEffect(() => {
        if(!regTime){
            dispatch(getRegTime());
        }
    }, [dispatch, regTime]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let errorCount = 0;

        let errorss = errorsInitial;

        if(formData.firstname.length === 0){
            errorCount ++;
            errorss.firstname = 'Write your First Name';
        }else
            errorss.firstname = '';

        if(!formData.lastname){
            errorCount ++;
            errorss.lastname = 'Write your Last Name';
        }else
            errorss.lastname = '';

        const regex = /^[a-zA-Z0-9.]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
        if(formData.email.length>0){
            if(regex.test(formData.email)){
                errorss.email = '';
            }else{
                errorCount++;
                errorss.email = 'Please use valid email address';
            }
        }else{
            errorCount++;
            errorss.email = 'Enter your email address';
        }

        if(!formData.year){
            errorCount ++;
            errorss.year = 'Choose your year of study';
        }else
            errorss.year = '';
        if(hasDoc){
            if(docs.length === 0){
                errorCount++;
                errorss.docs = 'Select supporting documents';
            }else   
                errorss.docs = '';
        }
        if(!formData.gender){
            errorCount++;
            errorss.gender = 'Choose your gender';
        }else   
            errorss.gender = '';


        setErrors(errorss);

        if(errorCount === 0)
            dispatch(registerToDorm({...formData, docs: docs}));
    }

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

    const showFile = (e) => {
        e.preventDefault();
        setCurFile(docs[e.currentTarget.dataset.index]);
    }
    const closeFilePreview = () => {
        setCurFile(null);
    }

    return (
        <div id="registration">
            <Modal className="filePreview" show={curFile} onHide={closeFilePreview}  fullscreen>
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
            <Container className="pb-5">
                <h1 className="text-center">Registration to Dorm</h1>

                {regTime ? (
                    <div>
                        <p className="text-center">Registration period: {moment(regTime.start).format('YYYY-MM-DD') + "  -  " + moment(regTime.end).format('YYYY-MM-DD')}</p>
                        {(moment(regTime.start).format('YYYY-MM-DD') <= today && regTime.end > moment(regTime.end).format('YYYY-MM-DD') && totalLeft > 0) ? (                        
                        <Form onSubmit={handleSubmit}>
                            <p className="text-center">Left: {totalLeft}</p>
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
                                <Col>
                                    <Form.Group controlId="form-email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="text" name="email" value={formData.email} onChange={handleChange} isInvalid={!!errors.email} />
                                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
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
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Check type="radio" id="gender-male" name="gender" label="Male" value="male" checked={formData.gender === 'male'} onChange={handleChange} />
                                        <Form.Check type="radio" id="gender-female" name="gender" label="Female" value="female" checked={formData.gender === 'female'} onChange={handleChange} />
                                        <Form.Control className="d-none" isInvalid={!!errors.gender} />
                                        <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Сhoose the answers that suits you <span className="text-secondary">(Optional)</span></Form.Label>
                                        <Form.Check name="fromLargeFamily" id="form-fromLargeFamily" checked={formData.fromLargeFamily} onChange={handleChange} label="You are from large family(4 childen under 18)" />
                                        <Form.Check name="isDisabled" id="form-isDisabled" checked={formData.isDisabled} onChange={handleChange} label="You are disabled" />
                                        <Form.Check name="fromIncompleteFamily" id="form-fromIncompleteFamily" checked={formData.fromIncompleteFamily} onChange={handleChange} label="You are from an incomplete family" />
                                        <Form.Check name="isOrphan" id="form-isOrphan" checked={formData.isOrphan} onChange={handleChange} label="You are an orphan" />
                                    </Form.Group>
                                </Col>
                                <Col className={!hasDoc && ('d-none')}>
                                    <Form.Group>
                                        <Form.Label id="form-file">Please select supporting documents
                                            <FileBase64 multiple={true}  
                                                onDone={(els) => {
                                                    els.map((el)=>{
                                                        if(el.type === 'application/pdf' || el.type.includes('image/')){
                                                            setErrors({...errors, docs: ''});
                                                            setDocs(prev => [...prev, {file: el.base64, name: el.name, type: el.type}]);
                                                        }
                                                    });
                                                }} 
                                            />
                                        </Form.Label>
                                        <Form.Control isInvalid={!!errors.docs} className="d-none" />
                                        <br/>
                                        <Form.Text>Choose pdf or img files</Form.Text>
                                        <Form.Control.Feedback type="invalid">{errors.docs}</Form.Control.Feedback>
                                        <div id="file-preview">
                                            {docs && docs.map((doc, key) => (
                                                <div className="preview" key={key}>
                                                    <span className="close" onClick={(e) => {
                                                        e.preventDefault();
                                                        setDocs(docs.filter(item => item != doc))
                                                        }}>
                                                        <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M24 0H0V24H24V0Z" fill="black" fillOpacity="0.01"/>
                                                            <path d="M5 5L19 19" stroke="black" strokeWidth="2"/>
                                                            <path d="M5 19L19 5" stroke="black" strokeWidth="2"/>
                                                        </svg>
                                                    </span>
                                                    <span data-index={key} onClick={showFile}>
                                                        <div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 64C0 28.65 28.65 0 64 0H224V128C224 145.7 238.3 160 256 160H384V448C384 483.3 355.3 512 320 512H64C28.65 512 0 483.3 0 448V64zM256 128V0L384 128H256z"/></svg>
                                                        </div>
                                                        <p>{doc.name}</p>
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button type="submit">Submit</Button>
                        </Form>
                        ) : (
                            <div  className="text-center">
                                Registration is <span className="text-danger">Closed</span>
                                {totalLeft === 0 && (
                                    <p className="text-center text-warning">No seats left</p>
                                )}
                            </div>
                        ) }
                    </div>
                ) : (
                    <div className="text-center p-5">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Загрузка...</span>
                        </Spinner>
                    </div>
                )}

            </Container>
        </div>
    );
};

export default Registration;