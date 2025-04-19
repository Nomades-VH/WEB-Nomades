
import styles from "../index.module.scss";
import React, {useEffect, useState} from "react";
import Alert from "../../Alert";
import Button from "../../Button";
import Form from "..";


function CrudForm({children, data, titlePage: title, messageError, messageSuccess, crudService, defaultInputs, redirectTo, isUpdate=false}) {
    const [openAlert, setOpenAlert] = useState(false);
    const [openAlertErrorCreate, setOpenAlertErrorCreate] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [titlePage, setTitlePage] = useState("");

    useEffect(() => {
        const newTitle = title.replace(/ /g, '-')
        setTitlePage(newTitle);
    },[title])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await crudService(data);
            if (response) {
                setOpenAlert(true);
                defaultInputs();
                localStorage.removeItem(titlePage)
            } else {
                setOpenAlertErrorCreate(true)
            }
        } catch (error) {
            setErrorMsg(error.message)
        } finally {
            localStorage.removeItem(titlePage)
            setTitlePage('')
        }
    };

    useEffect(() => {
        if (titlePage.includes('-')) localStorage.setItem(titlePage, JSON.stringify(data));
    }, [data, titlePage]);


    return (
        <div className={styles.container}>
            <h2>{title}</h2>
            <Form onSubmit={handleSubmit}>
                    {children}
                <Button className={styles.submit} type="submit">Enviar</Button>
            </Form>
            {
            isUpdate ? 
            
                <Alert isOpen={openAlert} setAlertOpen={() => setOpenAlert(!openAlert)} textClose="Não"
                    hasButtons={false} redirectTo={redirectTo}>
                    <h2>{messageSuccess}</h2>
                </Alert> 
                : 
                <Alert isOpen={openAlert} setAlertOpen={() => setOpenAlert(!openAlert)} textClose="Não"
                    hasButtons={true} textContinue={"Sim"} redirectTo={redirectTo}>
                    <h2>{messageSuccess}</h2>
                </Alert>
            }
            <Alert isOpen={openAlertErrorCreate} setAlertOpen={() => setOpenAlertErrorCreate(!openAlertErrorCreate)}
                   hasButtons={false}>
                <h2>{messageError ? messageError : errorMsg }</h2>
            </Alert>
        </div>
    )
}

export default CrudForm;