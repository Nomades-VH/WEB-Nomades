import styles from "../../styles.module.scss";
import { useAuth } from "../../../../context/AuthContext";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import React from 'react';
import { Navbar, Nav, Container, Offcanvas, Image } from 'react-bootstrap';
import { FaUserCircle } from "react-icons/fa";
import UserService from "../../../../services/user";

export default function Logged({user}) {
    const { logout } = useAuth();
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    const toUpperCaseInitial = (text) => {
        return text?.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
            return a.toUpperCase();
        });
    };

    useEffect(() => {
        async function getProfileImage() {
            try {
                const result = await UserService.get_profile_image();
                console.log('resultado', result)
                if (result) setProfileImage(result)    
            } catch (error) {
                throw error
            }
        }

        getProfileImage();
    }, [])

    const handleLogout = async () => {
        await logout();
    };

    // Função para abrir e fechar o Offcanvas
    const handleClose = () => setShowOffcanvas(false);
    const handleShow = () => setShowOffcanvas(true);

    console.log('profileimage: ', profileImage)
    const imageComponent = profileImage ? <Image width={50} height={50} className={styles.profile} src={profileImage} alt="foto de perfil"/> : <FaUserCircle size={50} color="#ccc" />

    if (user && imageComponent) {
        return (
            <Navbar variant="dark" expand="xl">
                <Container className={styles.menu}>
                    <Navbar.Brand className={styles.username}>{imageComponent}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="offcanvas-navbar" onClick={handleShow} />
                    <Navbar.Offcanvas
                        id="offcanvas-navbar"
                        aria-labelledby="offcanvas-navbar-label"
                        placement="end"
                        className="bg-dark"
                        show={showOffcanvas}
                        onHide={handleClose}
                    >
                        <Offcanvas.Header closeButton className={styles.offcanvasHeader}>
                            <Offcanvas.Title id="offcanvas-navbar-label" className={styles.title}>
                                { imageComponent }
                                <h4>{ toUpperCaseInitial(user?.username)}</h4>
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body >
                            <Nav className={styles.links}>
                                {user.permission >= 3 && <Link className="nav-link" to="usuario/criar" onClick={handleClose}>Criar usuário</Link>}
                                <Link className="nav-link" to="/apostilas" onClick={handleClose}>Apostilas</Link>
                                <Link className="nav-link" to="/usuarios/aprovar" onClick={handleClose}>Aprovação</Link>
                                <Link className="nav-link" to="/" onClick={() => { handleLogout(); handleClose(); }}>Sair</Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        );
    }
};
