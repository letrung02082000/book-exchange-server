import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

import './OrderManagement.css';
import OrderDetail from './OrderDetail';

function OrderManagement() {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [order, setOrder] = useState(null);

    useEffect(() => {
        axios
            .get('/api/order', { params: { page: page, limit: 10 } })
            .then((res) => res.data)
            .then((res) => {
                if (res.type == 'Valid') {
                    setData(res.data);
                }
            });
    }, [page]);

    const refreshPage = (order) => {
        axios
            .get('/api/order', { params: { page: page, limit: 10 } })
            .then((res) => res.data)
            .then((res) => {
                if (res.type == 'Valid') {
                    setData(res.data);
                }
            });
    };

    const handleSeeDetail = (order) => {
        setShow(true);
        setOrder(order);
    };

    const handleClose = () => {
        setShow(false);
    };

    return (
        <div className='container'>
            <h2>Đơn đặt sách</h2>
            <Table
                responsive
                className='table'
                striped
                bordered
                hover
                size='sm'
            >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Mã đơn hàng</th>
                        <th>Ngày đặt</th>
                        <th>Thông tin người đặt</th>
                        <th>Thông tin đơn hàng</th>
                        <th>Tình trạng</th>
                        <th>Tổng tiền</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((child, index) => {
                        return (
                            <tr key={child._id}>
                                <td>{index + 1}</td>
                                <td>{child.orderId}</td>
                                <td>{child.orderDate}</td>
                                <td>
                                    {child.user.name}
                                    <br />
                                    {child.tel}
                                    <br />
                                    {child.address}
                                </td>
                                <td>
                                    {child.shipping
                                        ? 'Giao hàng tận nơi'
                                        : 'Lấy tại tủ sách'}
                                    <br />
                                    {child.payment
                                        ? 'Thanh toán trực tiếp'
                                        : 'Thanh toán bằng Momo'}
                                </td>
                                <td>
                                    {child.pending
                                        ? 'Chưa xử lý'
                                        : child.success
                                        ? 'Thành công'
                                        : 'Đã hủy'}
                                </td>
                                <td>{child.total}</td>
                                <td>
                                    <Button
                                        variant='success'
                                        onClick={() => handleSeeDetail(child)}
                                    >
                                        Xem chi tiết
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <OrderDetail
                order={order}
                show={show}
                handleClose={handleClose}
                refreshPage={refreshPage}
            />
        </div>
    );
}

export default OrderManagement;
