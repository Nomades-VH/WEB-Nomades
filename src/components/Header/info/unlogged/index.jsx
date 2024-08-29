import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import styles from "../../styles.module.scss";
import {Link} from "react-router-dom";
import {FaLock} from 'react-icons/fa';
import Alert from "../../../commons/Alert";
import Login from "../../../Login";
import React, {useState} from "react";
import Contact from "../../../commons/Contact";
import { useAuth } from "../../../../context/AuthContext";


export default function Unlogged() {
    const [openAlert, setOpenAlert] = useState(false);
    const [navigateTo, setNavigateTo] = useState('/');
    const {user, isAuthenticated} = useAuth();

    return (
        <div>
            <Navbar expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Nav>
                        <div className={styles.menu}>
                            <NavDropdown title="Entrar" className={styles.dropdown} drop="start">
                                <NavDropdown.Item className={styles.item}>
                                    <a onClick={() => {
                                        setNavigateTo('/apostilas');
                                        setOpenAlert(true);
                                    }}>
                                        Apostilas <FaLock/>
                                    </a></NavDropdown.Item>
                                <NavDropdown.Item className={styles.item}>
                                    <Link to={'/login'}>
                                        Entrar
                                    </Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    </Nav>
                </Container>
            </Navbar>

            <Alert isOpen={openAlert} setAlertOpen={() => setOpenAlert(!openAlert)} hasButtons={false}>
                <Login redirectTo={navigateTo}/>
                <Contact />
            </Alert>

        </div>

    )
}