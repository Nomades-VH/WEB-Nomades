import DisplayPage from "../../components/DisplayPage";
import {useAuth} from "../../context/AuthContext";
import {Link} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import KickService from "../../services/kick";
import styles from "../content.module.scss"
import {MdDelete, MdEdit} from "react-icons/md";
import Loading from "../../components/commons/Loading";

export default function Kicks() {
    const {isAuthenticated, user} = useAuth();
    const [kicks, setKicks] = useState(null);
    const [logged, setLogged] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [alertDeleteKick, setAlertDeleteKick] = useState(false);

    useEffect(() => {
        if (user) {
            setLogged(true)
        }

        const loadKicks = async () => {
            try {
                const response = await KickService.get()

                if (response) {
                    setKicks(response);
                }
            } catch (error) {
                setKicks(null);
            }
        }

        loadKicks()
    }, [setKicks, setLogged, user]);

    const handleDeleteKick = async () => {
        try {
            await KickService.delete(idToDelete)
            const updateKicks = kicks.filter((kick) => kick.id !== idToDelete)
            setKicks(updateKicks)
        } catch (error) {
            setAlertDeleteKick(false)
        }
    }

    if (logged && (kicks != null || user.permission >= 3)) {
        return (
            <DisplayPage titlePage={(
                <>
                    <h1>Chutes</h1>
                    {user.permission >= 3 ?
                        <Link to={'/chute/criar'} style={{position: "absolute", alignSelf: "flex-end"}}><h2>+</h2>
                        </Link> : null}
                </>
            )} alertDelete={alertDeleteKick} setAlertDelete={setAlertDeleteKick} textDelete={"Deseja mesmo deletar esse chute?"} handleDelete={handleDeleteKick}>
                {kicks && kicks.map((kick) => (
                    <div key={kick.id} className={user.permission >= 3 ? styles.contentPermission : styles.contentOutPermission}>
                        <Link to={`/chute/${kick.id}`} >
                            <h4 className="link">
                                {kick.name}
                            </h4>
                        </Link>

                        {user.permission >= 3 ?
                            <div className={styles.buttons}>
                                <Link to={`/chute/editar/${kick.id}`}><MdEdit/></Link>
                                <Link to={"#"} onClick={() => {
                                    setAlertDeleteKick(true);
                                    setIdToDelete(kick.id)
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