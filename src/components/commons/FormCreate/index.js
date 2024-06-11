
import styles from "./index.module.scss";
import Form from "../Form";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Alert from "../Alert";
import {error} from "next/dist/build/output/log";
import Button from "../Button";


function FormCreate({children, data, titlePage: title, messageError, messageSuccess, serviceCreate, defaultInputs, redirectTo}) {
    const navigate = useNavigate();
    const [openAlert, setOpenAlert] = useState(false);
    const [openAlertErrorCreate, setOpenAlertErrorCreate] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [titlePage, setTitlePage] = useState("");

    const handleChange = () => {
        const newTitle = title.replace(" ", '-')
        setTitlePage(newTitle);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await serviceCreate(data);
            if (response) {
                setOpenAlert(true);
                defaultInputs();
                localStorage.removeItem(titlePage)
            } else {
                setOpenAlertErrorCreate(true)
            }
        } catch (error) {
            setErrorMsg(error.message)
        }
    };

    useEffect(() => {
        localStorage.setItem(titlePage, JSON.stringify(data));
    }, [titlePage, data]);


    return (
        <div className={styles.container}>
            <h2>{titlePage}</h2>
            <Form onChange={handleChange} onSubmit={handleSubmit}>
                    {children}
                <Button className={styles.submit} type="submit">Criar</Button>
            </Form>
            <Alert isOpen={openAlert} setAlertOpen={() => setOpenAlert(!openAlert)} textClose="Não"
                   hasButtons={true} textContinue={"Sim"} redirectTo={redirectTo}>
                <h2>{messageSuccess}</h2>
            </Alert>
            <Alert isOpen={openAlertErrorCreate} setAlertOpen={() => setOpenAlertErrorCreate(!openAlertErrorCreate)}
                   hasButtons={false}>
                <h2>{messageError ? messageError : errorMsg }</h2>
            </Alert>
        </div>
    )
}

export default FormCreate;