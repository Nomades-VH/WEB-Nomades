
import styles from "./index.module.scss";
import Form from "../commons/Form";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Alert from "../commons/Alert";

class Hubs {
    static Areias = "areias";
    static SJBarreiro = "sjbarreiro";
    static Piquete = "piquete";
    static Silveiras = "silveiras";

    static getKeyByValue(value) {
        return Object.keys(Hubs).find(key => Hubs[key] === value);
    }
}

function FormCreate({children, token, data, titlePage, messageError, messageSuccess, serviceCreate, defaultInputs}) {
    const navigate = useNavigate();
    const [openAlert, setOpenAlert] = useState(false);
    const [openAlertErrorCreate, setOpenAlertErrorCreate] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await serviceCreate(token, data);
            if (response) {
                setOpenAlert(true);
                defaultInputs();
            } else {
                setOpenAlertErrorCreate(true)
            }
        } catch (error) {
            alert(` ${messageError} : ${error}`);
        }
    };


    return (
        <div className={styles.container}>
            <h2>{titlePage}</h2>
            <Form onSubmit={handleSubmit}>
                <div>
                    {children}
                </div>
                <button type="submit" className={styles.btn + " btn btn-secondary"}>Criar</button>
            </Form>
            <Alert isOpen={openAlert} setAlertOpen={() => setOpenAlert(!openAlert)} textClose="Não"
                   hasButtons={true} textContinue={"Sim"} redirectTo={'/'}>
                <h2>{messageSuccess}</h2>
            </Alert>
            <Alert isOpen={openAlertErrorCreate} setAlertOpen={() => setOpenAlertErrorCreate(!openAlertErrorCreate)}
                   hasButtons={false}>
                <h2>{messageError}</h2>
            </Alert>
        </div>
    )
}

export default FormCreate;