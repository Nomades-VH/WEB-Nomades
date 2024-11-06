import styles from './index.module.scss'
import Image from "next/image";
import logo from "../../public/images/Logo.jpeg";
import React, {useEffect, useState} from "react";
import {Button, Carousel} from "react-bootstrap";

const images = importAll(require.context("../../public/exames/", false, /\.(png|jpe?g|svg)$/));

function importAll(r) {
    return r.keys().map(r);
}


export default function Home() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [buttonIsVisible, setButtonIsVisible] = useState(false);
    const [visibilityPhotos, setVisibilityPhotos] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // Adiciona o listener para capturar o resize
        window.addEventListener('resize', handleResize);

        // Remove o listener ao desmontar o componente
        return () => window.removeEventListener('resize', handleResize);
    }, [window]);

    useEffect(() => {
    windowSize.width >= 777 ? setButtonIsVisible(false) : setButtonIsVisible(true)
    windowSize.width >= 755 ? setVisibilityPhotos(true) : setVisibilityPhotos(false)
    }, [windowSize.width])

    const alterVisibilityPhotos = () => {
        visibilityPhotos ? setVisibilityPhotos(false) : setVisibilityPhotos(true)
    }

    return (
        <div className={styles.main}>
            <h1>Sobre nós</h1>
            <section className={styles.about}>
                <div className={styles.carouselContainer}>
                    <div className={styles.text}>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                            has
                            been
                            the industrys standard dummy text ever since the 1500s, when an unknown printer took a
                            galley
                            of type and scrambled it to make a type specimen book. It has survived not only five
                            centuries,
                            but also the leap into electronic typesetting, remaining essentially unchanged. It was
                            popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                            passages,
                            and more recently with desktop publishing software like Aldus PageMaker including
                            versions
                            of
                            Lorem Ipsum.
                        </p>
                        <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has
                                been
                                the industrys standard dummy text ever since the 1500s, when an unknown printer took a
                                galley
                                of type and scrambled it to make a type specimen book. It has survived not only five
                                centuries,

                            </p>
                    </div>
                    <div className={styles.images} >
                        {
                            images.slice(0, 15).map((image, index) => (
                                <Image className={styles.image} src={image.default} alt={`Image ${index}`} key={index} style={visibilityPhotos ? {display: 'inline'} : {display: "none"}}/>
                            ))
                        }
                        { 
                            buttonIsVisible ? <Button className={styles.buttonImages} onClick={alterVisibilityPhotos}>Ver fotos</Button> : null
                        }
                    </div>
                    
                </div>
            </section>


            <div className={styles.kiossanins}>
                <h1>Faixas pretas da Equipe</h1>

                <div className={styles.person}>
                    <Image src={logo} alt={"L"}/>
                    <div>
                        <h2>Kiossanim</h2>
                        <p id={'text-1'}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                            has
                            been
                            the industrys standard dummy text ever since the 1500s, when an unknown printer took a
                            galley
                            of type and scrambled it to make a type specimen book. It has survived not only five
                            centuries,
                            but also the leap into electronic typesetting, remaining essentially unchanged. It was
                            popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                            passages,
                            and more recently with desktop publishing software like Aldus PageMaker including
                            versions
                            of
                            Lorem Ipsum.

                        </p>
                    </div>
                </div>
                <div className={styles.personRight}>
                    <div className={styles.person}>
                        <div>
                            <h2>Kiossanim</h2>
                            <p id={"text-2"}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has
                                been
                                the industrys standard dummy text ever since the 1500s, when an unknown printer took a
                                galley
                                of type and scrambled it to make a type specimen book. It has survived not only five
                                centuries,
                                but also the leap into electronic typesetting, remaining essentially unchanged. It was
                                popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                                passages,
                                and more recently with desktop publishing software like Aldus PageMaker including
                                versions
                                of
                                Lorem Ipsum.
                            </p>
                        </div>
                        <Image src={logo} alt={"L"}/>
                    </div>
                </div>
                <div className={styles.person}>
                    <Image src={logo} alt={"L"}/>
                    <div>
                        <h2>Kiossanim</h2>
                        <p id={"text-3"}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                            has
                            been
                            the industrys standard dummy text ever since the 1500s, when an unknown printer took a
                            galley
                            of type and scrambled it to make a type specimen book. It has survived not only five
                            centuries,
                            but also the leap into electronic typesetting, remaining essentially unchanged. It was
                            popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                            passages,
                            and more recently with desktop publishing software like Aldus PageMaker including
                            versions
                            of
                            Lorem Ipsum.
                        </p>
                    </div>
                </div>
                <div className={styles.personRight}>
                    <div className={styles.person}>
                        <div>
                            <h2>Kiossanim</h2>
                            <p id={"text-2"}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has
                                been
                                the industrys standard dummy text ever since the 1500s, when an unknown printer took a
                                galley
                                of type and scrambled it to make a type specimen book. It has survived not only five
                                centuries,
                                but also the leap into electronic typesetting, remaining essentially unchanged. It was
                                popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                                passages,
                                and more recently with desktop publishing software like Aldus PageMaker including
                                versions
                                of
                                Lorem Ipsum.
                            </p>
                        </div>
                        <Image src={logo} alt={"L"}/>
                    </div>
                </div>
                <div className={styles.person}>
                    <Image src={logo} alt={"L"}/>
                    <div>
                        <h2>Kiossanim</h2>
                        <p id={'text-1'}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                            has
                            been
                            the industrys standard dummy text ever since the 1500s, when an unknown printer took a
                            galley
                            of type and scrambled it to make a type specimen book. It has survived not only five
                            centuries,
                            but also the leap into electronic typesetting, remaining essentially unchanged. It was
                            popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                            passages,
                            and more recently with desktop publishing software like Aldus PageMaker including
                            versions
                            of
                            Lorem Ipsum.
                        </p>
                    </div>
                </div>
                <div className={styles.personRight}>
                    <div className={styles.person}>
                        <div>
                            <h2>Kiossanim</h2>
                            <p id={"text-2"}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has
                                been
                                the industrys standard dummy text ever since the 1500s, when an unknown printer took a
                                galley
                                of type and scrambled it to make a type specimen book. It has survived not only five
                                centuries,
                                but also the leap into electronic typesetting, remaining essentially unchanged. It was
                                popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                                passages,
                                and more recently with desktop publishing software like Aldus PageMaker including
                                versions
                                of
                                Lorem Ipsum.
                            </p>
                        </div>
                        <Image src={logo} alt={"L"}/>
                    </div>
                </div>
                <div className={styles.person}>
                    <Image src={logo} alt={"L"}/>
                    <div>
                        <h2>Kiossanim</h2>
                        <p id={'text-1'}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                            has
                            been
                            the industrys standard dummy text ever since the 1500s, when an unknown printer took a
                            galley
                            of type and scrambled it to make a type specimen book. It has survived not only five
                            centuries,
                            but also the leap into electronic typesetting, remaining essentially unchanged. It was
                            popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                            passages,
                            and more recently with desktop publishing software like Aldus PageMaker including
                            versions
                            of
                            Lorem Ipsum.
                        </p>
                    </div>
                </div>
                <div className={styles.personRight}>
                    <div className={styles.person}>
                        <div>
                            <h2>Kiossanim</h2>
                            <p id={"text-2"}>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has
                                been
                                the industrys standard dummy text ever since the 1500s, when an unknown printer took a
                                galley
                                of type and scrambled it to make a type specimen book. It has survived not only five
                                centuries,
                                but also the leap into electronic typesetting, remaining essentially unchanged. It was
                                popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                                passages,
                                and more recently with desktop publishing software like Aldus PageMaker including
                                versions
                                of
                                Lorem Ipsum.
                            </p>
                        </div>
                        <Image src={logo} alt={"L"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
