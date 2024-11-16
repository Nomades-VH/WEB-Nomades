import {Container, Nav, Navbar, NavDropdown, Offcanvas} from "react-bootstrap";
import styles from "../../styles.module.scss";
import {Link} from "react-router-dom";
import {FaLock, FaUserCircle} from 'react-icons/fa';
import Alert from "../../../commons/Alert";
import Login from "../../../Login";
import React, {useState} from "react";
import Contact from "../../../commons/Contact";


export default function Unlogged() {
    const [openAlert, setOpenAlert] = useState(false);
    const [navigateTo, setNavigateTo] = useState('/');
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleClose = () => setShowOffcanvas(false);
    const handleShow = () => setShowOffcanvas(true);

    return (
        <div>
            <Navbar variant="dark" expand="xl">
                <Container className={styles.menu}>
                    <Navbar.Toggle aria-controls="offcanvas-navbar" onClick={handleShow} />
                    <Navbar.Offcanvas
                        id="offcanvas-navbar"
                        aria-labelledby="offcanvas-navbar-label"
                        placement="end"
                        className="bg-dark"
                        show={showOffcanvas}
                        onHide={handleClose}
                    >
                        <Offcanvas.Header closeButton>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className={styles.menu}>
                                <Link className="nav-link" onClick={() => {
                                    setNavigateTo('/apostilas');
                                    setOpenAlert(true);
                                }}>
                                    Apostilas <FaLock/>
                                </Link>
                                <Link className="nav-link" to="usuario/criar" onClick={handleClose}>Criar usuário</Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>

            <Alert isOpen={openAlert} setAlertOpen={() => setOpenAlert(!openAlert)} hasButtons={false}>
                <Login redirectTo={navigateTo}/>
                <Contact />
            </Alert>
        </div>
    )
}