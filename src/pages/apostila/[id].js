import {useEffect, useState} from "react";
import router, {useRouter} from "next/router";
import BandService from "../../services/band";
import {useAuth} from "../../context/AuthContext";
import Band from "../../components/Band";

export default function Apostila() {
    const router = useRouter();
    const {id} = router.query;
    const [band, setBand] = useState();
    const {isAuthenticated} = useAuth();

    useEffect(() => {
        if (!id) {
            router.push('/');
        } else {
            if (isAuthenticated) {
                const token = localStorage.getItem("access_token")

                async function loadBand() {
                    try {
                        const result = await BandService.get_by_id(token, id)
                        if (result) {
                            console.log(`Resultado: ${result.id} e ID: ${id}`)
                            setBand(result)
                        } else {
                            await router.push("/")
                        }
                    } catch (error) {
                        console.log(error)
                    }

                }

                loadBand()
            }
        }
    }, [id, router, isAuthenticated]);

    if (!id) {
        // Renderiza algo enquanto carrega
        return <div>Carregando...</div>;
    }

    if (band) {
        return (
            <div>
                <Band band={band} kicks={band.kicks} poomsaes={band.poomsaes} kibon_donjaks={band.kibon_donjaks}/>
            </div>
        )
    }

}