import styles from './index.module.scss'
import Footer from "../components/footer";
import Link from 'next/link';
import Menu from "../components/commons/Menu";

export default function Home(props) {

  return (
    <>
        <div className={styles.main}>
            <div className={styles.container}>
                <Menu />
            </div>
        </div>
    </>
  )
}
