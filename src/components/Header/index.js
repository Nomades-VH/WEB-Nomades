import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.scss';
import InputSearch from '../commons/inputs/InputSearch';
import { useSelector } from 'react-redux';
import logo from '../../public/images/Logo.jpeg'
import { useRouter } from 'next/router';

export default function Header() {
    const router = useRouter();

    return (
        <header className={styles.container}>
            <div className={styles.logo}>
                <Link href='/'>
                    <Image src={logo} width={80} height={80} />
                </Link>
            </div>

            <div className={styles.search}>
                <InputSearch placeholder='Pesquisar' onSubmit={(value) => router.push('/search?q=' + value)} />
            </div>

            <div className={styles.menu}>
                <Link href='/login'>Entrar</Link>
                <Link href='#'>Criar conta</Link>
            </div>
        </header>
    );
}