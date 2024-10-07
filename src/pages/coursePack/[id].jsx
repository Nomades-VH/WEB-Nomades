import {useEffect, useState} from "react";
import BandService from "../../services/band";
import {useAuth} from "../../context/AuthContext";
import Band from "../../components/Band";
import {useLocation, useNavigate, useParams} from 'react-router-dom';


export default function CoursePack() {
    const location = useLocation();
    const [band, setBand] = useState(location.state?.band || null);
    const {isAuthenticated} = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && !band) {

            async function loadBand(id) {
                try {
                    const result = await BandService.get_by_id(id)
                    if (result) {
                        setBand(result)
                    } else {
                        navigate("/")
                    }
                } catch (error) {
                }

            }

            loadBand(id)
        }
        
    }, [id, isAuthenticated, navigate]);

    if (band) {
        return (
            <Band band={band} kicks={band.kicks} poomsaes={band.poomsaes} kibon_donjaks={band.kibon_donjaks}/>
        )
    }
}