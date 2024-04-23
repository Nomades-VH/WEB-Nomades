import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import BandService from "../../services/band";
import {useAuth} from "../../context/AuthContext";
import Band from "../../components/Band";
import {useNavigate, useParams} from 'react-router-dom';
import Loading from "../../components/commons/Loading";


export default function CoursePack() {
    const router = useRouter();
    const [band, setBand] = useState();
    const {isAuthenticated} = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            navigate('/');
        } else {
            if (isAuthenticated) {
                const token = localStorage.getItem("access_token")

                async function loadBand() {
                    try {
                        const result = await BandService.get_by_id(token, id)
                        if (result) {
                            setBand(result)
                        } else {
                            navigate("/")
                        }
                    } catch (error) {
                    }

                }

                loadBand()
            }
        }
    }, [id, router, isAuthenticated, navigate]);

    if (band) {
        return (
            <Band band={band} kicks={band.kicks} poomsaes={band.poomsaes} kibon_donjaks={band.kibon_donjaks}/>
        )
    } else {
        return (
            <Loading />
        )
    }

}