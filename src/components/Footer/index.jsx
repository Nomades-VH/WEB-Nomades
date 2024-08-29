import styles from './styles.module.scss'
import Contact from "../commons/Contact";


export default function Footer() {

    return (
        <footer className={styles.main}>
            <section>
                <h2>
                    Contatos
                </h2>
                <Contact/>
            </section>
        </footer>
    )
}
