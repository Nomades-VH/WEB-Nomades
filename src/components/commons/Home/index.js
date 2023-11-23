import styles from './styles.module.scss';
import Image from "next/image";
import defaultImage from "../../../public/images/Logo.jpeg"
import d from "../../../public/images/img.png"
import a from "../../../public/images/faixa-sem-logo-amarelo.png"
import {Carousel} from "react-bootstrap";
import React from "react";


export default function Menu(props) {
    // Api para pegar a imagem do seu próprio instagram
    /*https://api.instagram.com/v1/users/self/media/recent?access_token={access-token}*/

    return (
        <div className={styles.container}>
            {/*<Polos />*/}
            <Carousel className={styles.carousel} data-bs-theme="dark">
                <Carousel.Item className={styles.item}>
                    <Image src={d} alt={'default image'} />
                </Carousel.Item>
                <Carousel.Item className={styles.item}>
                    <Image src={a} alt={'default image'} priority="false" />
                </Carousel.Item>
                <Carousel.Item className={styles.item}>
                    <Image src={defaultImage} alt={'default image'} />
                </Carousel.Item>
            </Carousel>
            <Carousel className={styles.carousel} data-bs-theme="dark">
                <Carousel.Item className={styles.item}>
                    <Image src={d} alt={'default image'} />
                </Carousel.Item>
                <Carousel.Item className={styles.item}>
                    <Image src={a} alt={'default image'} />
                </Carousel.Item>
                <Carousel.Item className={styles.item}>
                    <Image src={defaultImage} alt={'default image'} />
                </Carousel.Item>
            </Carousel>
        </div>
    )
}