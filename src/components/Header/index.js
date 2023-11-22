import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.scss';
import logo from '../../public/images/LogoAtual-removebg-preview.png'
import { useRouter } from 'next/router';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";

export default function Header(props) {
    const router = useRouter();

    return (
        <header className={styles.container}>
            <div className={styles.logo}>
                <Link href='/'>
                    <Image src={logo} width={80} height={80} alt="Logo da equipe Nômades" />
                </Link>
            </div>
            <div className={styles.itens}>
                {/*<Link className={styles.default} href={'/store'}>Loja</Link>*/}
                {
                    props.user ? (
                        <Navbar expand="lg" className="bg-body-tertiary">
                            <Container>
                                <div className={styles.menu}>
                                    {props.user.name}
                                </div>
                            </Container>

                        </Navbar>

                    ) : (
                        <Navbar expand="lg">
                            <Container>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                    <Nav>
                                        <div className={styles.menu}>
                                            <Nav.Link className={styles.default} href='/login'>Entrar</Nav.Link>
                                            <NavDropdown title="Opções" className={styles.dropdown}>
                                                <NavDropdown.Item href="/band">Apostila</NavDropdown.Item>
                                                <NavDropdown.Item href="/polo">Seu Polo</NavDropdown.Item>
                                            </NavDropdown>
                                        </div>
                                    </Nav>
                            </Container>
                        </Navbar>
                    )
                }
            </div>


        </header>
    );
}