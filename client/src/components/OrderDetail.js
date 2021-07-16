import React, { useEffect, useState } from 'react';
import { Modal, Button, ButtonGroup } from 'react-bootstrap';
import Book from './Book';

import axios from 'axios';

function OrderDetail(props) {
    const [bookList, setBookList] = useState([]);
    const [pending, setPending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (props.order) {
            setBookList(props.order.bookList);
            setSuccess(props.order.success);
            setPending(props.order.pending);
        }
    }, [props.order]);

    const discardOrder = () => {
        setLoading(true);
        axios
            .post('/api/order/status', { id: props.order._id, status: 1 })
            .then((res) => res.data)
            .then((res) => {
                if (res.type == 'Valid') {
                    setPending(false);
                    setSuccess(false);
                    setLoading(false);
                    props.refreshPage();
                }
            });
    };

    const setSuccessOrder = () => {
        setLoading(true);
        axios
            .post('/api/order/status', { id: props.order._id, status: 0 })
            .then((res) => res.data)
            .then((res) => {
                if (res.type == 'Valid') {
                    setPending(false);
                    setSuccess(true);
                    setLoading(false);
                    props.refreshPage();
                }
            });
    };

    return (
        <div>
            <Modal
                show={props.show}
                onHide={props.handleClose}
                backdrop='static'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết đơn sách</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Book data={bookList} />
                </Modal.Body>
                {loading ? (
                    <Modal.Footer>
                        <p>Vui lòng chờ...</p>
                    </Modal.Footer>
                ) : (
                    <Modal.Footer>
                        {pending ? (
                            <ButtonGroup>
                                <Button variant='danger' onClick={discardOrder}>
                                    Hủy đơn
                                </Button>
                                <Button
                                    variant='success'
                                    onClick={setSuccessOrder}
                                >
                                    Giao hàng thành công
                                </Button>
                            </ButtonGroup>
                        ) : (
                            <div>
                                <p>
                                    Tình trạng:{' '}
                                    {success ? 'Giao thành công' : 'Đã hủy'}
                                </p>
                                {success ? (
                                    <Button
                                        variant='danger'
                                        onClick={discardOrder}
                                    >
                                        Hủy đơn
                                    </Button>
                                ) : null}
                            </div>
                        )}
                    </Modal.Footer>
                )}
            </Modal>
        </div>
    );
}

export default OrderDetail;
