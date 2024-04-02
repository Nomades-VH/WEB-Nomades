import Image from 'next/image';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import logo from '../../public/images/LogoAtual-removebg-preview.png'
import {useAuth} from "../../context/AuthContext";
import Logged from "./info/logged";
import Unlogged from "./info/unlogged";

export default function Header() {
    const { user, isAuthenticated } = useAuth();
    const toUpperCaseInitial = (text) => {
        return text.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
            return a.toUpperCase();
        });
    }

    return (
        <header className={styles.container}>
            <div className={styles.logo}>
                <Link to='/'>
                    <Image src={logo} width={80} height={80} alt="Logo da equipe Nômades"/>
                </Link>
                <h2>{user ? toUpperCaseInitial(user.username) : null}</h2>
            </div>
            <div className={styles.itens}>
                {/*<Link className={styles.default} href={'/store'}>Loja</Link>*/}
                {
                    isAuthenticated ? (
                        <Logged user={user}/>
                    ) : (
                        <Unlogged />
                    )
                }
            </div>
        </header>
    );
}