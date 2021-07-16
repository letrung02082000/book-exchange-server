import React, { useState, useEffect, Alert } from 'react';
import { Form, Button } from 'react-bootstrap';

import axios from 'axios';
import './Login.css';

function Login(props) {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const postLogin = (e) => {
        e.preventDefault();
        axios
            .post('/api/admin/login', {
                username: username,
                password: password,
            })
            .then((res) => res.data)
            .then((res) => {
                if (res.type == 'Valid' && res.status == 'Success') {
                    props.handleLogin();
                } else {
                    alert('Đăng nhập thất bại!');
                }
            });
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className='login-container'>
            <Form className='login-form' onSubmit={postLogin}>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Tên đăng nhập</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder=''
                        onChange={handleUsernameChange}
                    />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder=''
                        onChange={handlePasswordChange}
                    />
                </Form.Group>
                <Button variant='primary' type='submit' onSubmit={postLogin}>
                    Đăng nhập
                </Button>
            </Form>
        </div>
    );
}

export default Login;
