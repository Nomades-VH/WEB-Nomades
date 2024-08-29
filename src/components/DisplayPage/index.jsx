import styles from "./index.module.scss";
import React from "react";
import Alert from "../commons/Alert";

export default function DisplayPage({children, titlePage, alertDelete, setAlertDelete, textDelete, handleDelete}) {
    return (
        <div className={styles.container}>
            <div className={styles.contents}>
                {titlePage}
                <div className={styles.content}>
                    {children}
                    <Alert isOpen={alertDelete} setAlertOpen={() => setAlertDelete(!alertDelete)} textClose="Não"
                           hasButtons={true} textContinue={"Sim"} redirectTo={"#"} onContinue={handleDelete}>
                        <h2>{textDelete}</h2>
                    </Alert>
                </div>
            </div>
        </div>
    )
}