import {Container, Nav, Navbar} from "react-bootstrap";
import styles from "../../styles.module.scss";

export default function Unlogged() {
    return (
        <Navbar expand="lg">
            <Container>
                <Nav.Link className={styles.default} href='/login'>Entrar</Nav.Link>
            </Container>
        </Navbar>
    )
}