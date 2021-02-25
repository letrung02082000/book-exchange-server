import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button, Table, Modal, Image } from "react-bootstrap";
export default (props) => {
    console.log(props);
    const [others, setOthers] = useState(props.children.others || []);
    const [newOther, setNewOther] = useState({ key: "", value: "" });
    function handlePushBook(e) {
        e.preventDefault();
        let bookInf = {
            sku: document.getElementById("formBasicSku").value,
            name: document.getElementById("formBasicBookname").value,
            price: document.getElementById("formBasicPrice").value || 0,
            imageurl: document.getElementById("formBasicUrlImage").value,
            description: document.getElementById("formBasicDescription").value,
            quantity: document.getElementById("formBasicQuantity").value || 0,
            others: others
        };
        axios
            .post("/api/book/push", {
                _id: props.children._id,
                book: bookInf
            })
            .then((res) => res.data)
            .then((res) => {
                console.log(res);
                if (res.type == "Valid") {
                    if (res.err) {
                        setError(res.err);
                    } else {
                        props.updateBook({
                            _id: props.children._id,
                            ...bookInf
                        });
                        props.handleClose();
                    }
                } else setError(["Lỗi form các giá trị"]);
            });
    }
    const [err, setError] = useState(null);
    return (
        <Form onSubmit={handlePushBook}>
            <Modal onHide={() => setError(null)} show={!!err}>
                <Modal.Header closeButton>Lỗi</Modal.Header>
                <Modal.Body>
                    {err &&
                        err.map((e) => <p style={{ color: "#ff0000" }}>{e}</p>)}
                </Modal.Body>
            </Modal>

            <Form.Group controlId="formBasicSku">
                <Form.Label>Mã vạch</Form.Label>
                <Form.Control
                    required
                    defaultValue={props.children.sku}
                    type="number"
                    placeholder="Nhập mã vạch"
                />
            </Form.Group>
            <Form.Group controlId="formBasicBookname">
                <Form.Label>Tên sách</Form.Label>
                <Form.Control
                    required
                    defaultValue={props.children.name}
                    type="text"
                    placeholder="Nhập tên sách"
                />
            </Form.Group>
            <div
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
                <Form.Group controlId="formBasicPrice">
                    <Form.Label>Giá (đ)</Form.Label>
                    <Form.Control
                        required
                        defaultValue={props.children.price || 0}
                        type="number"
                        placeholder="Nhập giá"
                        step={1000}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicQuantity">
                    <Form.Label>Số lượng </Form.Label>
                    <Form.Control
                        defaultValue={props.children.quantity}
                        type="number"
                        placeholder="Nhập số lượng"
                    />
                </Form.Group>
            </div>
            <Form.Group controlId="formBasicUrlImage">
                <Form.Label>Đường dẫn hình ảnh (đ)</Form.Label>
                <Form.Control
                    defaultValue={props.children.imageurl}
                    // type="url"
                    placeholder="Nhập đường dẫn hình ảnh"
                />
                <Image src={props.children.imageurl} />
            </Form.Group>
            <Form.Group controlId="formBasicDescription">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={10}
                    defaultValue={props.children.description}
                    type="text"
                    placeholder="Mô tả"
                />
            </Form.Group>

            <Form.Label>Thông tin sản phẩm</Form.Label>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Thông tin</th>

                        <th>Mô tả</th>
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
                            </tr>
                        ))}
                    <tr>
                        <td>
                            <Button
                                onClick={() => {
                                    let tmp = [...others];
                                    tmp.push(newOther);
                                    setNewOther({ key: "", value: "" });

                                    setOthers(tmp);
                                }}
                            >
                                Thêm
                            </Button>
                        </td>
                        <td>
                            <input
                                placeholder="Ví dụ: năm xuất bản"
                                value={newOther.key}
                                onChange={(e) => {
                                    setNewOther({
                                        ...newOther,
                                        key: e.target.value
                                    });
                                }}
                            />
                        </td>
                        <td>
                            <input
                                placeholder="Ví dụ: năm 2021"
                                value={newOther.value}
                                onChange={(e) => {
                                    setNewOther({
                                        ...newOther,
                                        value: e.target.value
                                    });
                                }}
                            />
                        </td>
                    </tr>
                </tbody>
            </Table>

            <Button
                // onClick={handlePushBook}
                style={{ float: "right" }}
                variant="primary"
                type="submit"
            >
                {!props.children._id ? "Thêm" : "Cập nhật"} sách
            </Button>
            <Button variant="secondary" onClick={() => props.handleClose()}>
                Thoát
            </Button>
        </Form>
    );
};
