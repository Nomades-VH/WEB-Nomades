import BandService from "../../services/band";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import {MdEdit} from "react-icons/md";
import {MdDelete} from "react-icons/md";
import DisplayPage from "../../components/DisplayPage";
import styles from "./index.module.scss"
import Loading from "../../components/commons/Loading";
import Alert from "../../components/commons/Alert";


export default function CoursePackets() {
    const [alertDeleteBand, setAlertDeleteBand] = useState(false);
    const {isAuthenticated, user} = useAuth();
    const [bands, setBands] = useState(null);
    const navigate = useNavigate();
    const [logged, setLogged] = useState();
    const [idToDelete, setIdToDelete] = useState();
    const [alertNotBand, setAlertNotBand] = useState(false);
    const [messageError, setMessageError] = useState('');

    useEffect(() => {
        async function loadBand() {
            if (user) {
                setLogged(true)
            }
            try {
                const result = await BandService.get()
                if (result) {
                    setBands(result)
                }
            } catch (error) {
                setBands([])
                setAlertNotBand(true)
                setMessageError(error.message)
            }
        }

        loadBand()
    }, [isAuthenticated, user, navigate]);


    const handleDeleteBand = async () => {
        try {
            await BandService.delete(idToDelete);
            const updatedBands = bands.filter((band) => band.id !== idToDelete);
            setBands(updatedBands);
        } catch (error) {
            console.error("Erro ao excluir faixa:", error);
        }
    };
    if (logged && bands != null) {
        return (
            <div>
                <DisplayPage titlePage={<>
                    <h1>Apostilas</h1>
                    {user.permission >= 3 ?
                        <Link to='/faixa/criar' style={{position: "absolute", alignSelf: "flex-end"}}>
                            <h1>+</h1>
                        </Link> : null}
                </>} alertDelete={alertDeleteBand} setAlertDelete={setAlertDeleteBand}
                             textDelete={"Deseja mesmo deletar essa faixa?"} handleDelete={handleDeleteBand}>

                    {bands && bands.map((band) => (
                        // eslint-disable-next-line react/jsx-key
                        <div className={user.permission >= 3 ? styles.contentPermission : styles.contentOutPermission}>
                            <Link to={`/apostila/${band.id}`}>
                                <h4 className="link">{band.gub}º Gub - {band.name}</h4>
                            </Link>

                            {user.permission >= 3 ?
                                <div className={styles.buttons}>
                                    <Link to={`/apostila/editar/${band.id}`}><MdEdit/></Link>
                                    <Link to={"#"} onClick={() => {
                                        setAlertDeleteBand(true);
                                        setIdToDelete(band.id)
                                    }}><MdDelete style={{color: "red"}}/></Link>
                                </div> : null}
                        </div>

                    ))}
                </DisplayPage>

                <Alert isOpen={alertNotBand} setAlertOpen={() => navigate('/')} redirectTo={null} hasButtons={true}
                       textContinue={"Voltar"}>{messageError}</Alert>
            </div>
        )
    } else {
        return (
            <Loading/>
        )
    }
}