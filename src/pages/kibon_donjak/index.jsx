import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"
import KibonDonjakService from "../../services/kibon_donjak";
import { useNavigate } from "react-router-dom";
import DisplayPage from "../../components/DisplayPage";
import {Link} from "react-router-dom";
import styles from "../content.module.scss"
import {MdDelete, MdEdit} from "react-icons/md";

export default function KibonDonjaks() {
    const {user, isAuthenticated} = useAuth();
    const [kibon_donjaks, setKibonDonjaks] = useState(null);
    const [idToDelete, setIdToDelete] = useState(null);
    const [alertDeleteKibon, setAlertDeleteKibon] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        if (isAuthenticated && user.permission < 3) {
            navigate('/')
        }
        
        const load_kibons = async () => {
            try {
                const response = await KibonDonjakService.get()

                if (response) {
                    setKibonDonjaks(response)
                }
            } catch(error) {
                setKibonDonjaks(null)
            }
        }

        load_kibons()
    }, [user])

    const handleDeleteKibonDonjak = async () => {
        try {
            await KibonDonjakService.delete(idToDelete)
            const updateKibons = kibon_donjaks.filter((kibon_donjak) => kibon_donjak.id !== idToDelete)
            setKibonDonjaks(updateKibons)
        } catch (error) {
            setAlertDeleteKibon(false)
        }
    }

    return (
        <DisplayPage titlePage={(
            <>
                <h1>Kibon Donjaks</h1>
                {user.permission >= 3 ?
                    <Link to={'/kibon_donjak/criar'} style={{position: "absolute", alignSelf: "flex-end"}}><h2>+</h2>
                    </Link> : null}
            </>
        )} alertDelete={alertDeleteKibon} setAlertDelete={setAlertDeleteKibon} textDelete={"Deseja mesmo deletar esse kibon donjak?"} handleDelete={handleDeleteKibonDonjak}>
            {kibon_donjaks && kibon_donjaks.map((kibon_donjak) => (
                <div key={kibon_donjak.id} className={user.permission >= 3 ? styles.contentPermission : styles.contentOutPermission}>
                    <Link to={`/kibon_donjak/${kibon_donjak.id}`} >
                        <h4 className="link">
                            {kibon_donjak.name}
                        </h4>
                    </Link>

                    {user.permission >= 3 ?
                        <div className={styles.buttons}>
                            <Link to={`/kibon_donjak/editar/${kibon_donjak.id}`}><MdEdit/></Link>
                            <Link to={"#"} onClick={() => {
                                setAlertDeleteKibon(true);
                                setIdToDelete(kibon_donjak.id)
                            }}><MdDelete style={{color: "red"}}/></Link>
                        </div> : null}
                </div>
            ))}
        </DisplayPage>
    )
}