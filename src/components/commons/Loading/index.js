import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import logo from "../../../public/images/LogoAtual-removebg-preview.png"

export default function Loading() {
    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <Image src={logo} alt={"logo da equipe"} width={250} height={250}/>
                <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                </div>
                <p>Carregando</p>
            </div>
        </div>

    )
}