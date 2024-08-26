import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import KibonDonjakService from "../../services/kibon_donjak";
import Loading from "../../components/commons/Loading";
import { useNavigate} from "react-router-dom";
import DisplayPage from "../../components/DisplayPage";

export default function KibonDonjak() {
    const {id} = useParams();
    const [kibonDonjak, setKibonDonjak] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const loadKibonDonjak = async (id) => {
                const response = await KibonDonjakService.get_by_id(id);

                if (response) {
                    setKibonDonjak(response)
                } else {
                    navigate('/chute')
                }
            }
            
            loadKibonDonjak(id)
        }
    }, [id, navigate])


    if (kibonDonjak) {
        return (
            <DisplayPage titlePage={<h1>{kibonDonjak.name}</h1>}>
                <p>{kibonDonjak.description}</p>
            </DisplayPage>
        )
    } return <Loading />
}