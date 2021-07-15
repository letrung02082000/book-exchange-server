import './App.css';
import LoginForm from './components/LoginForm';
import { Modal, Navbar, Container, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import BookManager from './components/BookManager';
import OrderManagement from './components/OrderManagement';
import { useState, useEffect } from 'react';
function App() {
    console.log(document.cookie.split(';'));
    function checkLogined() {
        let output = {};
        document.cookie.split(/\s*;\s*/).forEach(function (pair) {
            pair = pair.split(/\s*=\s*/);
            output[pair[0]] = pair.splice(1).join('=');
        });

        return !!output['admin'];
    }
    useEffect(() => {
        if (!checkLogined()) handleShow();
    }, []);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className='App'>
            <Router>
                <Navbar bg='light' expand='lg'>
                    <Container>
                        <Navbar.Brand href='#home'>
                            <img alt='logo' src='/logo.png' className='logo' />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls='basic-navbar-nav' />
                        <Navbar.Collapse id='basic-navbar-nav'>
                            <Nav className='me-auto'>
                                <Nav.Link as={Link} to='/'>
                                    Quản lý sách
                                </Nav.Link>
                                <Nav.Link as={Link} to='/order'>
                                    Đơn đặt sách
                                </Nav.Link>
                                <Nav.Link href='#link'>Thể loại</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                {/* <Modal
                show={show}
                // onHide={handleClose}
                backdrop='static'
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginForm handleClose={handleClose} />
                </Modal.Body>
            </Modal> */}

                <Switch>
                    <Route path='/order'>
                        <OrderManagement />
                    </Route>
                    <Route path='/'>
                        <BookManager />
                    </Route>
                    {/* <Route path='/category'>
                </Route> */}
                </Switch>
            </Router>
        </div>
    );
}

export default App;
