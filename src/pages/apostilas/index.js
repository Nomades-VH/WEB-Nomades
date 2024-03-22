import BandService from "../../services/band";
import {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthContext";
import styles from "./index.module.scss"
import router from "next/router";
import Link from "next/link";

export default function Apostila() {
    const {isAuthenticated, user} = useAuth();
    const [bands, setBands] = useState();

    useEffect(() => {
        if (isAuthenticated) {
            const token = localStorage.getItem("access_token")

            async function loadBand() {
                try {
                    const result = await BandService.get(token)
                    if (result) {
                        setBands(result)
                    } else {
                        await router.push("/")
                    }
                } catch (error) {
                    console.log(error)
                }

            }

            loadBand()
        }
    }, [isAuthenticated, user]);


    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1>Apostilas</h1>
                {bands && bands.map((band) => (
                    <Link key={band.id} href={`/apostila/${band.id}`}>
                        <h4 className="link">{band.gub}º Gub - {band.name}</h4>
                    </Link>
                ))}
            </div>
        </div>
    )
}