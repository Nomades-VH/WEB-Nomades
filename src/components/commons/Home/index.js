import styles from './styles.module.scss';
import Link from "next/link";
import Image from "next/image";
import Polos from "./Polos";

export default function Menu(props) {
    // Api para pegar a imagem do seu próprio instagram
    /*https://api.instagram.com/v1/users/self/media/recent?access_token={access-token}*/

    return (
        <div className={styles.container}>
            {/*<Polos />*/}
        </div>
    )
}