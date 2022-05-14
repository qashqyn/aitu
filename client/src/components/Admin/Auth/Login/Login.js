import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";

import { login } from '../../../../actions/auth';

import './styles.scss';
const initialState = {email: '', password: ''};
const initialErrors = {email: '', password: '', internal: ''};


const Login = () => {
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState(initialErrors);

    const { status } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        setErrors({...errors, [e.target.name]: ''});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let errCount = 0;

        const regex = /^[a-zA-Z0-9.]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
        if(formData.email){
            if(regex.test(formData.email)){
                setErrors({...errors, email: ''});
            }else{
                errCount++;
                setErrors({...errors, email: 'Please use valid email address'});
            }
        }else{
            errCount++;
            setErrors({...errors, email: 'Enter your email address'});
        }
        if(formData.password){
            if(formData.password.length < 8)
                setErrors({...errors, password: 'Password must be 8 or more characters in length'});
            if(formData.password.length > 20)
                setErrors({...errors, password: 'Password must be maximum of 20 characters in length'});

        }else{
            errCount++;
            setErrors({...errors, password: 'Enter your password'});
        }
        if(errCount === 0)
            dispatch(login(formData));
    }

    useEffect(() => {
        if(status){
            switch (status) {
                case 200:
                    window.location.reload();
                    break;
                case 400:
                    setErrors({...errors, password: 'Your Email or password is incorrect.'});
                    break;
                case 404:
                    setErrors({...errors, email: 'This account does not exist.'});
                    break;
                default:
                    setErrors({...errors, internal: 'Something went wrong, please try again later.'})
                    break;
            }   
        }
    }, [dispatch, status]);


    return(
        <div id="login">
            <Card>
                <Card.Body>
                    <h3>LogIn</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="form-email" className="pb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" name="email" onChange={handleChange}  isInvalid={errors.email.length > 0} />
                            <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group id="form-password" className="pb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" onChange={handleChange} isInvalid={errors.password.length > 0} />
                            <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
                        </Form.Group>
                        <Button type='submit'>Login</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Login;