import { Link } from "react-router-dom";
import styles from "./index.module.scss";


export default function Band({band, poomsaes, kicks, kibon_donjaks}) {
    return (

            <div className={styles.container}>
                <h1>Prospecto de {band.name} - {band.gub}° GUB</h1>
                <p style={{alignSelf: "center"}}>{band.meaning}</p>
                <div className={styles.content}>

                    <h3>1° - Kibon Donjaks</h3>
                    {kibon_donjaks.map((kibon_donjak, index) => {
                        return (
                            <div key={index}>
                                <div className={styles.attribute}>
                                    <h4>- <Link to={`/kibon_donjak/${kibon_donjak.id}`} key={index} className="link">{kibon_donjak.name}</Link>
                                    </h4>
                                    <p key={index}>({kibon_donjak.description})</p>
                                </div>
                            </div>

                        )
                    })}
                    <h3>2° - Poomsaes</h3>
                    {poomsaes.map((poomsae, index) => {
                        return (
                            <div key={index}>
                                <div className={styles.attribute}>
                                    <h4>- <Link to={`/poomsae/${poomsae.id}`} className="link" key={index}>{poomsae.name}</Link></h4>
                                </div>
                            </div>

                        )
                    })}
                    <h3>3° - Chutes</h3>
                    {kicks.map((kick, index) => {
                        return (
                            <div key={index}>
                                <div className={styles.attribute}>
                                    <h4>- <Link to={`/chute/${kick.id}`} className="link" key={index}>{kick.name}</Link></h4>
                                    <p key={index}>({kick.description})</p>
                                </div>
                            </div>

                        )
                    })}
                    <div className={styles.single}>
                        <h3>4° - Quebramento</h3>
                        <Link to="#" className="link">{band.breakdown}</Link>
                    </div>
                    <div className={styles.single}>
                        <h3>5° - Teoria</h3>
                        <Link to="#" className="link">{band.theory}</Link>
                    </div>
                    <div className={styles.single}>
                        <h3>6° - Alongamento</h3>
                        <Link to="#" className="link">{band.stretching}</Link>
                    </div>
                </div>
            </div>
    )

}