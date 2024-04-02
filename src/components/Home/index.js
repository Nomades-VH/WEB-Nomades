import styles from './styles.module.scss';
import Image from "next/image";
import {Carousel} from "react-bootstrap";
import React from "react";
import logo from "../../public/images/Logo.jpeg";

function importAll(r) {
    return r.keys().map(r);
}

const images = importAll(require.context("../../public/exames/", false, /\.(png|jpe?g|svg)$/));


export default function Menu(props) {
    // Api para pegar a imagem do seu próprio instagram
    /*https://api.instagram.com/v1/users/self/media/recent?access_token={access-token}*/

    return (
        <>
            <div className={styles.container}>
                <div className={styles.about}>
                    <h2>Nômades do Vale Histórico? Quem somos:</h2>
                    <div className={styles.text}>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been
                            the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                            galley
                            of type and scrambled it to make a type specimen book. It has survived not only five
                            centuries,
                            but also the leap into electronic typesetting, remaining essentially unchanged. It was
                            popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                            passages,
                            and more recently with desktop publishing software like Aldus PageMaker including versions
                            of
                            Lorem Ipsum.
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been
                            the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                            galley
                            of type and scrambled it to make a type specimen book. It has survived not only five
                            centuries,
                            but also the leap into electronic typesetting, remaining essentially unchanged. It was
                            popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                            passages,
                            and more recently with desktop publishing software like Aldus PageMaker including versions
                            of
                            Lorem Ipsum.
                        </p>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been
                            the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                            galley
                            of type and scrambled it to make a type specimen book. It has survived not only five
                            centuries,
                            but also the leap into electronic typesetting, remaining essentially unchanged. It was
                            popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                            passages,
                            and more recently with desktop publishing software like Aldus PageMaker including versions
                            of
                            Lorem Ipsum.
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been
                            the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                            galley
                            of type and scrambled it to make a type specimen book. It has survived not only five
                            centuries,
                            but also the leap into electronic typesetting, remaining essentially unchanged. It was
                            popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                            passages,
                            and more recently with desktop publishing software like Aldus PageMaker including versions
                            of
                            Lorem Ipsum.</p>
                    </div>
                </div>

                <div className={styles.carousels}>
                    <div className={styles.carousel1}>
                        <h2>Exame de Faixa 2022</h2>
                        <Carousel data-bs-theme="dark" interval={2500} fade={true}>
                            {
                                images.map((image, index) => (
                                    <Carousel.Item key={index} className={styles.item}>
                                        <Image src={image.default} alt={`Image ${index}`}/>
                                    </Carousel.Item>
                                ))
                            }
                        </Carousel>
                    </div>

                    <div className={styles.carousel2}>
                        <h2>Campeonato primeiro semestre 2023</h2>
                        <Carousel data-bs-theme="dark" interval={4000} slide={true}>
                            {
                                images.map((image, index) => (
                                    <Carousel.Item key={index} className={styles.item}>
                                        <Image src={image.default} alt={`Image ${index}`}/>
                                    </Carousel.Item>
                                ))
                            }
                        </Carousel>
                    </div>

                    <div className={styles.carousel3}>
                        <h2>Nômades do vale histórico</h2>
                        <Carousel data-bs-theme="dark" interval={3000}>
                            {
                                images.map((image, index) => (
                                    <Carousel.Item key={index} className={styles.item}>
                                        <Image src={image.default} alt={`Image ${index}`}/>
                                    </Carousel.Item>
                                ))
                            }
                        </Carousel>
                    </div>
                </div>
            </div>
        </>
    )
}