import logo from "./logo.svg";
import "./App.css";
import LoginForm from "./components/LoginForm";
import { Modal, Button } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.css";
import BookManager from "./components/BookManager";
import { useState, useEffect } from "react";
function App() {
    console.log(document.cookie.split(";"));
    function checkLogined() {
        let output = {};
        document.cookie.split(/\s*;\s*/).forEach(function (pair) {
            pair = pair.split(/\s*=\s*/);
            output[pair[0]] = pair.splice(1).join("=");
        });

        return !!output["admin"];
    }
    useEffect(() => {
        if (!checkLogined()) handleShow();
    }, []);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="App">
            <Modal
                show={show}
                // onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginForm handleClose={handleClose} />
                </Modal.Body>
            </Modal>
            <BookManager />
        </div>
    );
}

export default App;
