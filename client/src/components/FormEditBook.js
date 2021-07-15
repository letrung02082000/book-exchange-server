import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Button, Table, Modal, Image } from 'react-bootstrap';

import './FormEditBook.css';

export default (props) => {
    const [allCategories, setAllCategories] = useState([]);
    const [allStations, setAllStations] = useState([]);
    const [others, setOthers] = useState(props.children.others || []);
    const [newOther, setNewOther] = useState({ key: '', value: '' });
    const [category, setCategory] = useState(null);
    const [station, setStation] = useState('606494f90494e72dbcbee3b9');

    useEffect(() => {
        axios
            .get('/api/category/all')
            .then((res) => res.data)
            .then((res) => {
                if (res.type === 'Valid') {
                    setAllCategories(res.data);
                } else {
                    setAllCategories([]);
                }
            });

        axios
            .get('/api/station/query')
            .then((res) => res.data)
            .then((res) => {
                if (res.type === 'Valid') {
                    setAllStations(res.data);
                } else {
                    setAllStations([]);
                }
            });

        if (props.children.category) {
            setCategory(props.children.category._id);
        }

        if (props.children.station) {
            setStation(props.children.station._id);
        }
    }, []);

    const handleChangeCategory = (e) => {
        setCategory(e.target.value);
    };

    const handleChangeStation = (e) => {
        setStation(e.target.value);
    };

    function handlePushBook(e) {
        e.preventDefault();
        let bookInf = {
            sku: document.getElementById('formBasicSku').value,
            name: document.getElementById('formBasicBookname').value,
            oldprice: document.getElementById('formBasicOldPrice').value || 0,
            newprice: document.getElementById('formBasicNewPrice').value || 0,
            imageurl: document.getElementById('formBasicUrlImage').value,
            description: document.getElementById('formBasicDescription').value,
            quantity: document.getElementById('formBasicQuantity').value || 0,
            category: category,
            station: station,
            others: others,
        };

        console.log(bookInf);

        axios
            .post('/api/book/push', {
                _id: props.children._id,
                book: bookInf,
            })
            .then((res) => res.data)
            .then((res) => {
                if (res.type == 'Valid') {
                    if (res.err) {
                        setError(res.err);
                    } else {
                        props.updateBook({
                            _id: props.children._id,
                            ...bookInf,
                        });
                        props.handleClose();
                    }
                } else setError(['Lỗi form các giá trị']);
            });
    }
    const [err, setError] = useState(null);
    return (
        <Form style={{ width: '100%' }} onSubmit={handlePushBook}>
            <Modal onHide={() => setError(null)} show={!!err}>
                <Modal.Header closeButton>Lỗi</Modal.Header>
                <Modal.Body>
                    {err &&
                        err.map((e) => <p style={{ color: '#ff0000' }}>{e}</p>)}
                </Modal.Body>
            </Modal>

            <Form.Group controlId='formBasicSku'>
                <Form.Label>Mã vạch</Form.Label>
                <Form.Control
                    required
                    defaultValue={props.children.sku}
                    type='number'
                    placeholder='Nhập mã vạch'
                />
            </Form.Group>
            <Form.Group controlId='formBasicBookname'>
                <Form.Label>Tên sách</Form.Label>
                <Form.Control
                    required
                    defaultValue={props.children.name}
                    type='text'
                    placeholder='Nhập tên sách'
                />
            </Form.Group>
            <Form.Group controlId='formBasicCategory'>
                <Form.Label>Thể loại</Form.Label>
                <Form.Control
                    required
                    value={category}
                    as='select'
                    placeholder='Chọn thể loại'
                    onChange={handleChangeCategory}
                >
                    {allCategories.map((child) => (
                        <option value={child._id}>{child.name}</option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='formBasicStation'>
                <Form.Label>Tủ sách/Điểm đọc</Form.Label>
                <Form.Control
                    required
                    value={station}
                    as='select'
                    placeholder='Chọn tủ sách'
                    onChange={handleChangeStation}
                >
                    {allStations.map((child) => (
                        <option value={child._id}>{child.title}</option>
                    ))}
                </Form.Control>
            </Form.Group>
            <div
                style={{ display: 'flex', flexDirection: 'row', width: '100%' }}
            >
                <Form.Group controlId='formBasicOldPrice'>
                    <Form.Label>Giá cũ (đ)</Form.Label>
                    <Form.Control
                        required
                        defaultValue={props.children.oldprice || 0}
                        type='number'
                        placeholder='Nhập giá'
                        step={1000}
                    />
                </Form.Group>
                <Form.Group controlId='formBasicNewPrice'>
                    <Form.Label>Giá mới(đ)</Form.Label>
                    <Form.Control
                        required
                        defaultValue={props.children.newprice || 0}
                        type='number'
                        placeholder='Nhập giá'
                        step={1000}
                    />
                </Form.Group>
                <Form.Group controlId='formBasicQuantity'>
                    <Form.Label>Số lượng </Form.Label>
                    <Form.Control
                        defaultValue={props.children.quantity}
                        type='number'
                        placeholder='Nhập số lượng'
                    />
                </Form.Group>
            </div>
            <Form.Group controlId='formBasicUrlImage'>
                <Form.Label>Đường dẫn hình ảnh</Form.Label>
                <Form.Control
                    defaultValue={props.children.imageurl}
                    // type="url"
                    placeholder='Nhập đường dẫn hình ảnh'
                />
                <Image className='book-image' src={props.children.imageurl} />
            </Form.Group>
            <Form.Group controlId='formBasicDescription'>
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                    as='textarea'
                    rows={10}
                    defaultValue={props.children.description}
                    type='text'
                    placeholder='Mô tả'
                />
            </Form.Group>

            <Form.Label>Thông tin sản phẩm</Form.Label>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Thông tin</th>

                        <th>Mô tả</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {others &&
                        others.map((e, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <input
                                        value={others[index].key}
                                        onChange={(e) => {
                                            let tmp = [...others];
                                            tmp[index].key = e.target.value;
                                            setOthers(tmp);
                                        }}
                                    />
                                </td>
                                <td>
                                    <input
                                        value={others[index].value}
                                        onChange={(e) => {
                                            let tmp = [...others];
                                            tmp[index].value = e.target.value;
                                            setOthers(tmp);
                                        }}
                                    />
                                </td>
                                <td>
                                    <Button
                                        variant='danger'
                                        onClick={(index) => {
                                            let tmp = [...others];
                                            tmp.splice(index, 1);

                                            setOthers(tmp);
                                        }}
                                    >
                                        Xóa
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    <tr>
                        <td>{others && others.length}</td>
                        <td>
                            <input
                                placeholder='Ví dụ: năm xuất bản'
                                value={newOther.key}
                                onChange={(e) => {
                                    setNewOther({
                                        ...newOther,
                                        key: e.target.value,
                                    });
                                }}
                            />
                        </td>
                        <td>
                            <input
                                placeholder='Ví dụ: năm 2021'
                                value={newOther.value}
                                onChange={(e) => {
                                    setNewOther({
                                        ...newOther,
                                        value: e.target.value,
                                    });
                                }}
                            />
                        </td>
                        <td>
                            <Button
                                onClick={() => {
                                    let tmp = [...others];
                                    tmp.push(newOther);
                                    setNewOther({ key: '', value: '' });

                                    setOthers(tmp);
                                }}
                            >
                                Thêm
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </Table>

            <Button
                // onClick={handlePushBook}
                style={{ float: 'right' }}
                variant='primary'
                type='submit'
            >
                {!props.children._id ? 'Thêm' : 'Cập nhật'} sách
            </Button>
            <Button variant='secondary' onClick={() => props.handleClose()}>
                Thoát
            </Button>
        </Form>
    );
};
