import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import styles from "../../styles.module.scss";
import {useAuth} from "../../../../context/AuthContext";
import router from "next/router";

function Logged(user) {
    const {logout} = useAuth();

    const handleLogout = async () => {
        // Chama a função de logout
        logout();
        await router.push("/")
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
                            <NavDropdown.Item href="/apostilas">Apostilas</NavDropdown.Item>
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