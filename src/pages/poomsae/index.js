import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"
import PoomsaeService from "../../services/poomsae";
import Loading from "../../components/commons/Loading";
import DisplayPage from "../../components/DisplayPage";
import {Link} from "react-router-dom";
import styles from "../content.module.scss"
import {MdDelete, MdEdit} from "react-icons/md";


export default function Poomsaes() {
    const {isAuthenticated, user} = useAuth();
    const [poomsaes, setPoomsaes] = useState(null);
    const [idToDelete, setIdToDelete] = useState(null);
    const [alertDeletePoomsae, setAlertDeletePoomsae] = useState(false);
    const [logged, setLogged] = useState(false);


    useEffect(() => {

        if (user) {
            setLogged(true)
        }
        
        const load_poomsaes = async () => {
            try {
                const response = await PoomsaeService.get()

                if (response) {
                    setPoomsaes(response)
                }
            } catch(error) {
                setPoomsaes(null)
            }
        }

        load_poomsaes()
    }, [setPoomsaes, user])

    const handleDeletePoomsae = async () => {
        try {
            await PoomsaeService.delete(idToDelete)
            const updateKibons = poomsaes.filter((poomsae) => poomsae.id !== idToDelete)
            setPoomsaes(updateKibons)
        } catch (error) {
            setAlertDeletePoomsae(false)
        }
    }

    if (logged && (poomsaes != null || user.permission >= 3)) {
        return (
            <DisplayPage titlePage={(
                <>
                    <h1>Poomsaes</h1>
                    {user.permission >= 3 ?
                        <Link to={'/poomsae/criar'} style={{position: "absolute", alignSelf: "flex-end"}}><h2>+</h2>
                        </Link> : null}
                </>
            )} alertDelete={alertDeletePoomsae} setAlertDelete={setAlertDeletePoomsae} textDelete={"Deseja mesmo deletar esse kibon donjak?"} handleDelete={handleDeletePoomsae}>
                {poomsaes && poomsaes.map((poomsae) => (
                    <div key={poomsae.id} className={user.permission >= 3 ? styles.contentPermission : styles.contentOutPermission}>
                        <Link to={`/poomsae/${poomsae.id}`} >
                            <h4 className="link">
                                {poomsae.name}
                            </h4>
                        </Link>

                        {user.permission >= 3 ?
                            <div className={styles.buttons}>
                                <Link to={`/poomsae/editar/${poomsae.id}`}><MdEdit/></Link>
                                <Link to={"#"} onClick={() => {
                                    setAlertDeletePoomsae(true);
                                    setIdToDelete(poomsae.id)
                                }}><MdDelete style={{color: "red"}}/></Link>
                            </div> : null}
                    </div>
                ))}
            </DisplayPage>
        )
    } else {
        return (
            <Loading />
        )
    }
}