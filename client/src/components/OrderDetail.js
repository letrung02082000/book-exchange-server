import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Book from './Book';

function OrderDetail(props) {
    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        if (props.order) {
            setBookList(props.order.bookList);
        }
    }, [props.order]);
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
                <Modal.Footer>
                    <Button variant='primary' onClick={props.handleClose}>
                        Thành công
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default OrderDetail;
