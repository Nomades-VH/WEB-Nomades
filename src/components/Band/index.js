import styles from "./index.module.scss";

export default function Band(props) {
    return (
        <div className={styles.main}>

            <div className={styles.container}>
                <h1>{props.band.name}</h1>

                <div className={styles.content}>
                    <div className={styles.single}>
                        <h3>GUB:</h3> <p>{props.band.gub}</p>
                    </div>

                    <h3>Poomsae:</h3>
                    {props.poomsaes.map((poomsae, index) => {
                        return (
                            <div key={index} className={styles.attributeBox}>
                                <div className={styles.attribute}>
                                    <h4>Nome: </h4>
                                    <a href='#' className="link" key={index}>{poomsae.name}</a>
                                </div>
                                <div className={styles.attribute}>
                                    <h4>Descrição:</h4>
                                    <p key={index}>{poomsae.description}</p>
                                </div>
                            </div>

                        )
                    })}
                    <h3>Kibon Donjaks:</h3>
                    {props.kibon_donjaks.map((kibon_donjak, index) => {
                        return (
                            <div key={index} className={styles.attributeBox}>
                                <div className={styles.attribute}>
                                    <h4>{index + 1}º - </h4>
                                    <a href="#" key={index} className="link">{kibon_donjak.name}</a>
                                    <p key={index}>({kibon_donjak.description})</p>
                                </div>
                            </div>

                        )
                    })}
                    <h3>Chutes:</h3>
                    {props.kicks.map((kick, index) => {
                        return (
                            <div key={index} className={styles.attributeBox}>
                                <div className={styles.attribute}>
                                    <h4>{index + 1}º - </h4>
                                    <a href="#" className="link" key={index}>{kick.name}</a>
                                    <p key={index}>({kick.description})</p>
                                </div>
                            </div>

                        )
                    })}
                    <div className={styles.single}>
                        <h3>Teoria:</h3>
                        <a href="#" className="link">{props.band.theory}</a>
                    </div>
                    <div className={styles.single}>
                        <h3>Alongamento:</h3>
                        <a href="#" className="link">{props.band.stretching}</a>
                    </div>
                    <div className={styles.single}>

                        <h3>Quebramento:</h3>
                        <a href="#" className="link">{props.band.breakdown}</a>
                    </div>
                </div>
            </div>
            <div className={styles.container}>
                <h1>Complemento</h1>
            </div>
        </div>
    )

}