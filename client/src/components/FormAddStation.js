import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

function FormAddStation(props) {
    const [name, setName] = useState(null);
    const [desc, setDesc] = useState(null);
    const [address, setAddress] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();

        setLatitude(parseFloat(latitude));
        setLongitude(parseFloat(longitude));

        if (isNaN(latitude) || isNaN(longitude)) {
            return alert('Lỗi: không thể parse Latitude, Longitude');
        }

        axios
            .post('/api/station/add', {
                title: name,
                description: desc,
                address,
                latitude,
                longitude,
            })
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

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleLatitudeChange = (e) => {
        setLatitude(e.target.value);
    };

    const handleLongitudeChange = (e) => {
        setLongitude(e.target.value);
    };

    return (
        <Form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Tên trạm đọc/ tủ sách</Form.Label>
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

            <Form.Group>
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                    as='textarea'
                    rows={5}
                    required
                    onChange={handleAddressChange}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Latitude</Form.Label>
                <Form.Control
                    type='text'
                    required
                    onChange={handleLatitudeChange}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Longitude</Form.Label>
                <Form.Control
                    type='text'
                    required
                    onChange={handleLongitudeChange}
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

export default FormAddStation;
