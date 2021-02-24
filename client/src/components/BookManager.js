import { useEffect, useState } from "react";
import { Table, Button, Modal, ListGroup } from "react-bootstrap";
import "./BookManager.css";
import axios from "axios";
import FomrEditBook from "./FormEditBook";
export default (props) => {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    useEffect(() => {
        axios
            .get("/api/book/query", { params: { limit: 30, page: page } })
            .then((res) => res.data)
            .then((res) => {
                console.log(res);
                if (res.type == "Valid") setData(res.data);
                else setData([]);
            });
    }, [page]);
    const updateBook = (book) => {
        let tmp = [...data];

        for (let i = 0; i < tmp.length; i++) {
            if (tmp[i]._id == book._id) {
                tmp[i] = book;
                setData(tmp);
                return;
            }
        }
        tmp.unshift(book);
        setData(tmp);
    };
    console.log(data);
    function setShowInserting(_id = null) {}
    const [showedBook, setShowedBook] = useState(null);
    return (
        <div>
            <Modal
                show={!!showedBook}
                onHide={() => setShowedBook(null)}
                backdrop="static"
                // keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {showedBook && showedBook._id ? "Edit" : "Add"} book
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {showedBook && (
                        <FomrEditBook
                            updateBook={updateBook}
                            handleClose={() => setShowedBook(null)}
                        >
                            {showedBook}
                        </FomrEditBook>
                    )}
                </Modal.Body>
            </Modal>
            <div>
                <h2>Quản lí sách</h2>
                <Button
                    className="btn-new-book"
                    onClick={() => setShowedBook({ _id: null })}
                >
                    Thêm sách
                </Button>
            </div>
            <Table
                responsive
                className="table"
                striped
                bordered
                hover
                size="sm"
            >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Sku</th>
                        <th>Name</th>

                        <th>Price</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length != 0 ? (
                        data.map((e, index) => (
                            <tr
                                style={{ cursor: "pointer" }}
                                onClick={() => setShowedBook(e)}
                                key={e._id}
                            >
                                <td>{index + 1}</td>
                                <td>{e.sku}</td>
                                <td>{e.name}</td>
                                <td>{e.price}</td>
                                <td>
                                    {e.description
                                        ? e.description.substr(0, 20)
                                        : ""}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>Không có dữ liệu</tr>
                    )}
                </tbody>
            </Table>
            <ul className="btn-page">
                <li>{page > 3 && <p>...</p>}</li>

                <li onClick={() => setPage(page - 2)}>
                    {page - 2 > 0 && <p>{page - 2}</p>}{" "}
                </li>

                <li onClick={() => setPage(page - 1)}>
                    {page - 1 > 0 && <p>{page - 1}</p>}{" "}
                </li>

                <li style={{ backgroundColor: "#ff0000" }}>
                    <p>{page}</p>
                </li>
                <li onClick={() => setPage(page + 1)}>
                    <p>{page + 1}</p>
                </li>
                <li onClick={() => setPage(page + 2)}>
                    <p>{page + 2}</p>
                </li>
                <li>
                    {" "}
                    <p>...</p>
                </li>
            </ul>
        </div>
    );
};
