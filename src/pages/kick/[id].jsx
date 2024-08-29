import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import KickService from "../../services/kick";
import { useNavigate} from "react-router-dom";
import DisplayPage from "../../components/DisplayPage";

export default function Kick() {
    const {id} = useParams();
    const [kick, setKick] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const loadKick = async (id) => {
                const response = await KickService.get_by_id(id);

                if (response) {
                    setKick(response)
                } else {
                    navigate('/chute')
                }
            }
            
            loadKick(id)
        }
    }, [id, navigate])


    if (kick) {
        return (
            <DisplayPage titlePage={<h1>{kick.name}</h1>}>
                <p>{kick.description}</p>
            </DisplayPage>
        )
    }
}