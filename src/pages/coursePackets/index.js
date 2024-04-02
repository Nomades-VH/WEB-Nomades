import BandService from "../../services/band";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthContext";
import styles from "./index.module.scss"
import {Link, useNavigate} from "react-router-dom";
import {MdEdit} from "react-icons/md";
import {MdDelete} from "react-icons/md";
import Alert from "../../components/commons/Alert";


export default function CoursePackets() {
    const [alertDeleteBand, setAlertDeleteBand] = useState(false);
    const {isAuthenticated, user} = useAuth();
    const [bands, setBands] = useState();
    const navigate = useNavigate();
    const [logged, setLogged] = useState();
    const [idToDelete, setIdToDelete] = useState();
    const [token, setToken] = useState('');

    useEffect(() => {
        setToken(localStorage.getItem("access_token"));

        async function loadBand() {
            if (user) {
                console.log('opa')
                setLogged(true)
            }
            try {
                const result = await BandService.get(token)
                if (result) {
                    setBands(result)
                }
            } catch (error) {
            }
        }

        loadBand()
    }, [isAuthenticated, user, navigate, token]);

    if (!logged) {
        return (
            <div>Carregando...</div>
        )
    }

    const handleDeleteBand = async () => {
        try {
            await BandService.delete(token, idToDelete);
            const updatedBands = bands.filter((band) => band.id !== idToDelete);
            setBands(updatedBands);
        } catch (error) {
            console.error("Erro ao excluir faixa:", error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.contents}>
                <h1>Apostilas</h1>
                {user.permission >= 3 ?
                    <Link to='/faixa/criar' style={{position: "absolute", alignSelf: "end"}}>
                        <h1>+</h1>
                    </Link> : null}
                {bands && bands.map((band) => (
                    // eslint-disable-next-line react/jsx-key
                    <div className={styles.content}>
                        <Link to={`/apostila/${band.id}`}>
                            <h4 className="link">{band.gub}º Gub - {band.name}</h4>
                        </Link>
                        {user.permission >= 3 ?
                            <div>
                                <Link to={`/apostila/editar/${band.id}`}><MdEdit/></Link>
                                <Link to={"#"} onClick={() => {
                                    setAlertDeleteBand(true);
                                    setIdToDelete(band.id)
                                }}><MdDelete style={{color: "red"}}/></Link>
                            </div> : null}
                    </div>
                ))}
            </div>

            <Alert isOpen={alertDeleteBand} setAlertOpen={() => setAlertDeleteBand(!alertDeleteBand)} textClose="Não"
                   hasButtons={true} textContinue={"Sim"} redirectTo={"#"} onContinue={handleDeleteBand}>
                <h2>Deseja realmente excluir essa faixa?</h2>
            </Alert>
        </div>
    )
}