import React from 'react';
import styles from "./index.module.scss"
import Image from "next/image";
import logo from "../../../../public/images/LogoAtual-removebg-preview.png";
import {Link} from "react-router-dom";

function NotFound() {
    return (
        <div className={styles.container}>
            <h2>PÁGINA NÃO ENCONTRADA</h2>
            <Link to='/'>
                <Image src={logo} width={500} height={500} alt="Logo da equipe Nômades"/>
            </Link>
            <p>A URL que você está tentando acessar não corresponde a nenhuma página disponível.</p>
        </div>
    );
}

export default NotFound;