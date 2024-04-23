import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import styles from "../../styles.module.scss";
import {useAuth} from "../../../../context/AuthContext";
import {Link} from 'react-router-dom';
import Loading from "../../../commons/Loading";


export default function Logged(props) {
    const {logout, isAuthenticated} = useAuth();

    const handleLogout = async () => {
        logout();
    };

    if (props.user) {
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
    } else {
        return <Loading />
    }


}
