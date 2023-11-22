import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.scss';
import logo from '../../public/images/LogoAtual-removebg-preview.png'
import { useRouter } from 'next/router';

export default function Header(props) {
    const router = useRouter();

    return (
        <header className={styles.container}>
            <div className={styles.logo}>
                <Link href='/'>
                    <Image src={logo} width={80} height={80} />
                </Link>
            </div>
            <div className={styles.itens}>
                {/*<Link className={styles.default} href={'/store'}>Loja</Link>*/}
                {
                    props.user ? (
                        <div>
                            <div>
                                {props.user.name}
                            </div>
                        </div>
                    ) : (
                        <div className={styles.menu}>
                            <Link className={styles.default} href='/login'>Entrar</Link>
                        </div>
                    )
                }
            </div>


        </header>
    );
}