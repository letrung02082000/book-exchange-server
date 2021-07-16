import './App.css';
import Login from './components/Login';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import BookManager from './components/BookManager';
import OrderManagement from './components/OrderManagement';
import { useState, useEffect } from 'react';
function App() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (!checkLogined()) {
            setShow(true);
        }
    }, []);

    const handleLogin = () => setShow(false);

    const checkLogined = () => {
        let output = {};
        document.cookie.split(/\s*;\s*/).forEach(function (pair) {
            pair = pair.split(/\s*=\s*/);
            output[pair[0]] = pair.splice(1).join('=');
        });

        return !!output['admin'];
    };
    return (
        <div className='App'>
            {show ? (
                <Login handleLogin={handleLogin} />
            ) : (
                <Router>
                    <Navbar bg='light' expand='lg'>
                        <Container>
                            <Navbar.Brand as={Link} to='/'>
                                <img
                                    alt='logo'
                                    src='/logo.png'
                                    className='logo'
                                />
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
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <Switch>
                        <Route path='/order'>
                            <OrderManagement />
                        </Route>
                        <Route path='/'>
                            <BookManager />
                        </Route>
                    </Switch>
                </Router>
            )}
        </div>
    );
}

export default App;
