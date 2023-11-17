import styles from './index.module.scss'
import Footer from "../components/footer";
import Link from 'next/link';
import HomeComponent from "../components/commons/Home";

export default function Home(props) {

  return (
    <>
        <div className={styles.main}>
            <div className={styles.container}>
                <HomeComponent />
            </div>
        </div>
    </>
  )
}
