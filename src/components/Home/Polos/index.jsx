import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import defaultImage from "../../../../public/images/Logo.jpeg"

export default function Polos(props) {
    return (
        <div className={styles.container}>
            <section>
                <Image src={defaultImage} width={150} height={150} alt="Imagem do polo de Silveiras"/>
                <h3>Silveiras</h3>
            </section>
            <section>
                <Image src={defaultImage} width={150} height={150} alt="Imagem do polo de Areias"/>
                <h3>Areias</h3>
            </section>
            <section>
                <Image src={defaultImage} width={150} height={150} alt="Imagem do polo de São José do Barreiro"/>
                <h3>São José do Barreiro</h3>
            </section>
            <section>
                <Image src={defaultImage} width={150} height={150} alt="Imagem do polo de São José do Piquete"/>
                <h3>Piquete</h3>
            </section>
        </div>
    )
}