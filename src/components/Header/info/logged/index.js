import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import styles from "../../styles.module.scss";
import {useAuth} from "../../../../context/AuthContext";

function Logged(user) {
    const {logout} = useAuth();

    const handleLogout = () => {
        // Chama a função de logout
        logout();
    };

    const toUpperCaseInitial = (text) => {
        return text.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {
            return a.toUpperCase();
        });
    }

    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Nav>
                    <div className={styles.menu}>
                        <Nav className={styles.default}>{toUpperCaseInitial(user?.user.username)} </Nav>
                        <NavDropdown title="Opções" className={styles.dropdown}>
                            <NavDropdown.Item href="/band">Apostila</NavDropdown.Item>
                            <NavDropdown.Item href="/polo">Seu Polo</NavDropdown.Item>
                            <NavDropdown.Item onClick={handleLogout}>Sair</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default function User() {
    const { user } = useAuth();
    if (user) {
        return (
            <Logged user={user}/>
        );
    }

}