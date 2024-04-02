import styles from './index.module.scss'
import HomeComponent from "../components/Home";
import Image from "next/image";
import logo from "../public/images/Logo.jpeg";
import React from "react";


export default function Home(props) {

    return (
        <>
            <div className={styles.main}>
                <div className={styles.container}>
                    <HomeComponent/>
                </div>
                <div className={styles.kiossanins}>
                    <h1>Faixas pretas da Equipe</h1>
                    <div className={styles.person}>
                        <Image src={logo} alt={"L"}/>
                        <div>
                            <h1>Kiossanim Felipe Sampaio</h1>
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
                        </div>
                    </div>
                    <div className={styles.personRight}>
                        <div className={styles.person}>
                            <div>
                                <h1>Kiossanim Felipe Sampaio</h1>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                    has
                                    been
                                    the industry's standard dummy text ever since the 1500s, when an unknown printer took a
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
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                    has
                                    been
                                    the industry's standard dummy text ever since the 1500s, when an unknown printer took a
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
                            <h1>Kiossanim Felipe Sampaio</h1>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
