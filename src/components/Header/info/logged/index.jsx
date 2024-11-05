import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import styles from "../../styles.module.scss";
import {useAuth} from "../../../../context/AuthContext";
import {Link} from 'react-router-dom';


export default function Logged(props) {
    const {logout} = useAuth();
    const toUpperCaseInitial = (text) => {
        return text.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
            return a.toUpperCase();
        });
    }

    const handleLogout = async () => {
        await logout();
    };

    if (props.user) {
        return (
            
            <Navbar expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Nav>
                        <div  className={styles.menu}>
                            <NavDropdown className={styles.dropdown} drop="down">
                                {parseInt(props.user?.permission) >= 3 ?
                                    <NavDropdown.Item className={styles.item}>
                                        <Link to="usuario/criar">Criar usuário</Link>
                                    </NavDropdown.Item>
                                    : null}

                                <NavDropdown.Item className={styles.item}>
                                    <Link to="/apostilas">
                                        Apostilas
                                    </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout} className={styles.item}>
                                    <Link to="/">
                                        Sair
                                    </Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    </Nav>
                </Container>
            </Navbar>
        )
    }


}
