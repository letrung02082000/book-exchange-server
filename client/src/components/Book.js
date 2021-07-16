import React from 'react';
import { Table } from 'react-bootstrap';

import './Book.css';

function Book(props) {
    const data = props.data;
    console.log(data);
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Hình ảnh</th>
                        <th>Tên sách</th>
                        <th>Số lượng</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((child, index) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>
                                    <img
                                        src={child.book.imageurl}
                                        alt='img'
                                        className='book-img'
                                    />
                                </td>
                                <td>{child.book.name}</td>
                                <td>{child.quantity}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default Book;
