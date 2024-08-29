import Link from "next/link";
import {FaInstagram} from "react-icons/fa6";
import styles from "./styles.module.scss";
import {FaWhatsapp} from "react-icons/fa";

export default function Contact() {
    return (
        <div className={styles.container}>
            <Link target="_blank" href={"https://www.instagram.com/nomades_valehistorico/"}> <FaInstagram className={styles.icon}/> </Link>
            <Link target="_blank" href={'https://api.whatsapp.com/send/?phone=5512996140543'}><FaWhatsapp className={styles.icon}/></Link>
        </div>
    )
}