import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.scss';
import logo from '../../public/images/LogoAtual-removebg-preview.png'
import {useAuth} from "../../context/AuthContext";
import Logged from "./info/logged";
import Unlogged from "./info/unlogged";

export default function Header(props) {
    const { isAuthenticated } = useAuth();

    return (
        <header className={styles.container}>
            <div className={styles.logo}>
                <Link href='/'>
                    <Image src={logo} width={80} height={80} alt="Logo da equipe Nômades"/>
                </Link>
            </div>
            <div className={styles.itens}>
                {/*<Link className={styles.default} href={'/store'}>Loja</Link>*/}
                {
                    isAuthenticated ? (
                        <Logged />
                    ) : (
                        <Unlogged />
                    )
                }
            </div>


        </header>
    );
}
