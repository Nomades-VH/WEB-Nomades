import { Navbar, NavDropdown } from "react-bootstrap";
import styles from "./index.module.scss"
import { Link } from "react-router-dom";

export default function MenuOptions() {
    const menuItems = [
        { url: '/apostila/criar', label: 'Faixa' },
        { url: '/chute', label: 'Chute' },
        { url: '/kibon_donjak', label: 'Kibon-Donjak' },
        { url: '/poomsae', label: 'Poomsae' },
    ];
    
    return (
        <Navbar className={styles.navbar} expand="lg">
            <NavDropdown title={<h2>+</h2>} drop="start" className={styles.dropdownMenu}>
                {menuItems.map((item, index) => (
                    <NavDropdown.Item 
                        as={Link} 
                        to={item.url} 
                        className={styles.item} 
                        key={index}
                    >
                        {item.label}
                    </NavDropdown.Item>
                ))}
            </NavDropdown>
        </Navbar>
    );
}