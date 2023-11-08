import styles from './styles.module.scss';
import Link from "next/link";

export default function Menu(props) {

    return (
        <div className={styles.container}>
            <Link href={'/store'}>Loja</Link>
            <Link href={'poomsae/'}>Poomsae</Link>
            <Link href={'/'}>Kibon Donjak</Link>
            <Link href={'/'}>Tchagui Sool</Link>
            <Link href={'/'}>Kiorugui</Link>
            <Link href={'/'}>Matcho Kiorugui</Link>
            <Link href={'/'}>Taget</Link>
            <Link href={'/'}>Iron</Link>
            <Link href={'/'}>Yu yun sung</Link>
        </div>
    )
}