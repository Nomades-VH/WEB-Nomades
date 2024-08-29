import BandService from "../../services/band";
import React, {useEffect, useRef, useState} from "react";
import {useAuth} from "../../context/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import {MdEdit} from "react-icons/md";
import {MdDelete} from "react-icons/md";
import DisplayPage from "../../components/DisplayPage";
import styles from "../content.module.scss"
import Alert from "../../components/commons/Alert";
import {Navbar, NavDropdown} from "react-bootstrap";


export default function CoursePackets() {
    const [alertDeleteBand, setAlertDeleteBand] = useState(false);
    const {isAuthenticated, user, loading} = useAuth();
    const [bands, setBands] = useState(null);
    const navigate = useNavigate();
    const [idToDelete, setIdToDelete] = useState();
    const [alertNotBand, setAlertNotBand] = useState(false);
    const [messageError, setMessageError] = useState('');

    const textRefs = useRef([]);

    useEffect(() => {
        async function loadBand() {
            try {
                const result = await BandService.get()
                if (result) {
                    setBands(result)
                }
            } catch (error) {
                if (user?.permission < 3) {
                    setBands([])
                    setAlertNotBand(true)
                    setMessageError(error.message)
                }
            }
        }
        if (user) {
            loadBand()
        }
    }, [isAuthenticated, user, navigate]);

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
            const updatedBands = bands.filter((band) => band.id !== idToDelete);
            setBands(updatedBands);
        } catch (error) {
            console.error("Erro ao excluir faixa:", error);
        }
    };
    
    if (bands != null || user?.permission >= 3) {
        return (
            <DisplayPage titlePage={<>
                <h1>Apostilas</h1>
                {user?.permission >= 3 ?
                    <Navbar className={styles.navbar} expand="lg">
                        <NavDropdown title={<h2>+</h2>} drop="start" className={styles.dropdownMenu}>
                            <NavDropdown.Item className={styles.item}>
                                <Link to='/apostila/criar'>
                                    Faixa
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item className={styles.item}>
                                <Link to='/chute'>
                                    Chute
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item className={styles.item}>
                                <Link to='/kibon_donjak'>
                                    Kibon-Donjak
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item className={styles.item}>
                                <Link to='/poomsae'>
                                    Poomsae
                                </Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Navbar>
                    : null}
            </>} alertDelete={alertDeleteBand} setAlertDelete={setAlertDeleteBand}
                         textDelete={"Deseja mesmo deletar essa faixa?"} handleDelete={handleDeleteBand}>
                {bands && bands.map((band, index) => (
                    <div key={band.id}
                         className={user?.permission >= 3 ? styles.contentPermission : styles.contentOutPermission}>
                        <Link to={`/apostila/${band.id}`}>
                            <h4 className="link" ref={(el) => (textRefs.current[index] = el)}>{band.gub}º Gub - {band.name}</h4>
                        </Link>

                        {user?.permission >= 3 ?
                            <div className={styles.buttons}>
                                <Link to={`/apostila/editar/${band.id}`}><MdEdit/></Link>
                                <Link to={"#"} onClick={() => {
                                    setAlertDeleteBand(true);
                                    setIdToDelete(band.id)
                                }}><MdDelete style={{color: "red"}}/></Link>
                            </div> : null}
                    </div>

                ))}
                <Alert isOpen={alertNotBand} setAlertOpen={() => navigate('/')} redirectTo={null} hasButtons={true}
                       textContinue={"Voltar"}>{messageError}</Alert>
            </DisplayPage>
        )
    }
}