import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import styles from "../../styles.module.scss";
import {useAuth} from "../../../../context/AuthContext";
import {Link} from 'react-router-dom';


export default function Logged(props) {
    const {logout} = useAuth();

    const handleLogout = async () => {
        // Chama a função de logout
        logout();
    };

    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Nav>
                    <div className={styles.menu}>
                        <NavDropdown title="Opções" className={styles.dropdown} drop="start">
                            {parseInt(props.user?.permission) >= 3 ?
                                <div><NavDropdown.Item>
                                    <Link to="usuario/criar">Criar usuário</Link>
                                </NavDropdown.Item></div>
                                : null}

                            <NavDropdown.Item>
                                <Link to="/apostilas">Apostilas</Link>
                            </NavDropdown.Item>
                            {/*<NavDropdown.Item>*/}
                            {/*    <Link to="/polo">Seu Polo</Link>*/}
                            {/*</NavDropdown.Item>*/}
                            <NavDropdown.Item onClick={handleLogout}>Sair</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </Nav>
            </Container>
        </Navbar>
    )
}
