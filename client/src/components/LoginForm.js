import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
export default (props) => {
    return (
        <div>
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    let username = document.getElementById("formBasicUsername")
                        .value;
                    let password = document.getElementById("formBasicPassword")
                        .value;
                    console.log(username, password);
                    axios
                        .post("/api/admin/login", {
                            username: username,
                            password: password
                        })
                        .then((res) => res.data)
                        .then((res) => {
                            console.log(res);
                            if (
                                res.type == "Valid" &&
                                res.status == "Success"
                            ) {
                                props.handleClose();
                            }
                        });
                }}
            >
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="username"
                        placeholder="Enter username"
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};
