import React from "react";
import styles from "./index.module.scss"
import {Link as LinkInter, useNavigate} from "react-router-dom";
import NextLink from "next/link"
import { IoClose } from "react-icons/io5";


import Button from "../Button";
import Image from "next/image";
import logo from "../../../../public/images/LogoAtual-removebg-preview.png";

export default function Alert({
                                  isOpen,
                                  redirectTo,
                                  redirectOtherPage,
                                  setAlertOpen,
                                  children,
                                  textClose,
                                  textContinue,
                                  hasButtons,
                                  onContinue
                              }) {
    const navigate = useNavigate();

    if (isOpen) {
        return (
            <div className={styles.background}>

                <div className={styles.container}>
                    <h2 onClick={setAlertOpen} className={styles.close}><IoClose className={styles.icon} /></h2>
                    <LinkInter to='/'>
                        <Image src={logo} width={80} height={80} alt="Logo da equipe Nômades"/>
                    </LinkInter>
                    <h2 className={styles.content}>
                        {children}
                    </h2>
                    {
                        hasButtons ? <div className={styles.buttons}>
                            <Button onClick={() => {
                                onContinue ? onContinue() : null
                                setAlertOpen();
                            }}>{textContinue}</Button>
                            {
                                redirectTo != null ?
                                    <Button onClick={() => {
                                        navigate(redirectTo);
                                        setAlertOpen();
                                    }}>{textClose}</Button> :
                                    <Button>
                                        <NextLink href={redirectOtherPage}>{textClose}</NextLink>
                                    </Button>
                            }
                        </div> : null}

                </div>
            </div>
        )
    }

    return null;
}