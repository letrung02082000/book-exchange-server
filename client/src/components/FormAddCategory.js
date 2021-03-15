import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Button, Table, Modal, Image } from 'react-bootstrap';

function FormAddCategory(props) {
    const [name, setName] = useState(null);
    const [desc, setDesc] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name);
        axios
            .post('/api/category/create', { name: name, description: desc })
            .then((res) => res.data)
            .then((res) => {
                if (res.type === 'Valid') {
                    props.handleClose();
                } else {
                    alert('Lỗi' + res.err);
                }
            });
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDescChange = (e) => {
        setDesc(e.target.value);
    };
    return (
        <Form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Tên thể loại</Form.Label>
                <Form.Control
                    type='text'
                    required
                    onChange={handleNameChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                    as='textarea'
                    rows={5}
                    onChange={handleDescChange}
                />
            </Form.Group>
            <Form.Group
                style={{ display: 'flex', justifyContent: 'space-between' }}
            >
                <Button variant='danger' onClick={props.handleClose}>
                    Huỷ
                </Button>
                <Button variant='primary' type='submit'>
                    Thêm
                </Button>
            </Form.Group>
        </Form>
    );
}

export default FormAddCategory;
