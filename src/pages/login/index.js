import Login from "../../components/Login";
import Image from "next/image";
import headerImage from '../../public/images/faixa-sem-logo-amarelo.png'
import logo from "../../public/images/Logo.jpeg"
import styles from "./login.module.scss"
import {Link} from "react-router-dom";


export default function LoginPage() {
    return (
        <div className={styles.main}>
            <Image src={headerImage} alt={'faixa'} className={styles.band}/>

            <div className={styles.container}>
                <div className={styles.login}>
                    <Login/>
                </div>
                <div className={styles.image}>
                    <Link to={'/'}><Image src={logo} width={500} height={500} alt={"Logo da equipe"}/></Link>
                </div>
            </div>
        </div>

    )
}