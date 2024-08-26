import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import PoomsaeService from "../../services/poomsae";
import Loading from "../../components/commons/Loading";
import { useNavigate} from "react-router-dom";
import DisplayPage from "../../components/DisplayPage";

export default function Poomsae() {
    const {id} = useParams();
    const [poomsae, setPoomsae] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const loadPoomsae = async (id) => {
                const response = await PoomsaeService.get_by_id(id);

                if (response) {
                    setPoomsae(response)
                } else {
                    navigate('/chute')
                }
            }
            
            loadPoomsae(id)
        }
    }, [id, navigate])


    if (poomsae) {
        return (
            <DisplayPage titlePage={<h1>{poomsae.name}</h1>}>
                <p>{poomsae.description}</p>
            </DisplayPage>
        )
    } return <Loading />
}