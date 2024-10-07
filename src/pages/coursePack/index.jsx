import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import BandService from "../../services/band";
import DisplayPage from "../../components/DisplayPage";
import Alert from "../../components/commons/Alert";
import MenuOptions from "./options";
import styles from "../content.module.scss";

export default function CoursePackets() {
    const [alertDeleteBand, setAlertDeleteBand] = useState(false);
    const { user } = useAuth();
    const [bands, setBands] = useState(null);
    const navigate = useNavigate();
    const [idToDelete, setIdToDelete] = useState();
    const [alertNotBand, setAlertNotBand] = useState(false);
    const [messageError, setMessageError] = useState('');
    const textRefs = useRef([]);

    // Carrega as bandas
    useEffect(() => {
        const loadBand = async () => {
            try {
                const result = await BandService.get();
                setBands(result || []);
            } catch (error) {
                if (user?.permission < 3) {
                    setBands([]);
                    setAlertNotBand(true);
                    setMessageError(error.message);
                }
            }
        };
        if (user) {
            loadBand();
        }
    }, [user]);

    useEffect(() => {
        textRefs.current.forEach((text) => {
            if (text && text.scrollWidth > text.clientWidth) {
                text.classList.add('animated-text');
            }
        });
    }, [bands]);

    const handleDeleteBand = async () => {
        try {
            await BandService.delete(idToDelete);
            setBands((prevBands) => prevBands.filter((band) => band.id !== idToDelete));
            setAlertDeleteBand(false);
        } catch (error) {
            console.error("Erro ao excluir faixa:", error);
        }
    };
    
    const ActionButtons = ({ band }) => (
        <div className={styles.buttons}>
            <Link to={`/apostila/editar/${band.id}`} state={{band: band}}><MdEdit /></Link>
            <Link to={"#"} onClick={() => {
                setAlertDeleteBand(true);
                setIdToDelete(band.id);
            }}>
                <MdDelete style={{ color: "red" }} />
            </Link>
        </div>
    );

    const BandItem = ({ band }) => (
        <div key={band.id} className={user?.permission >= 3 ? styles.contentPermission : styles.contentOutPermission}>
            <Link to={`/apostila/${band.id}`} state={{ band: band }}>
                <h4 className="link">{band.gub}º Gub - {band.name}</h4>
            </Link>
            {user?.permission >= 3 && <ActionButtons band={band} />}
        </div>
    );

    return (
        (bands != null || user?.permission >= 3) ? (
            <DisplayPage
                titlePage={
                    <>
                        <h1>Apostilas</h1>
                        {user?.permission >= 3 && <MenuOptions />}
                    </>
                }
                alertDelete={alertDeleteBand}
                setAlertDelete={setAlertDeleteBand}
                textDelete={"Deseja mesmo deletar essa faixa?"}
                handleDelete={handleDeleteBand}
            >
                {bands && bands.map((band) => (
                    <BandItem band={band} key={band.id} />
                ))}
                <Alert
                    isOpen={alertNotBand}
                    setAlertOpen={() => navigate('/')}
                    redirectTo={null}
                    hasButtons={true}
                    textContinue={"Voltar"}
                >
                    {messageError}
                </Alert>
            </DisplayPage>
        ) : null
    );
}
