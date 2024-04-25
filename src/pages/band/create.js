import FormCreate from "../../components/commons/FormCreate";
import InputText from "../../components/commons/inputs/InputText";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import BandService from "../../services/band";
import styles from "./styles.module.scss";

export default function CreateBand() {

    const [gub, setGub] = useState();
    const [name, setName] = useState('');
    const [meaning, setMeaning] = useState('');
    const [theory, setTheory] = useState('');
    const [breakdown, setBreakdown] = useState('');
    const [stretching, setStretching] = useState('');
    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (parseInt(user.permission) <= 3) {
            navigate("/")
        }
    }, [navigate, user]);

    const defaultInputs = async () => {
        setGub('')
        setName('');
        setMeaning('');
        setTheory('');
        setBreakdown('');
        setStretching('');
    }

    return (
        <FormCreate data={{gub, name, meaning, theory, breakdown, stretching}}
                    titlePage={"Criar usuário"} messageSuccess={"Continuar criando faixa?"}
                    messageError={"Erro ao criar faixa."} serviceCreate={BandService.create} defaultInputs={defaultInputs}
        redirectTo={"/apostilas"}>
            <section className={styles.inputs}>
                <InputText
                    type="text"
                    placeholder="Gub (Somente número)"
                    required={true}
                    label={"Gub da Faixa"}
                    value={gub}
                    onChange={(e) => setGub(e.target.value)}
                />
                <InputText
                    type="text"
                    placeholder="Nome"
                    required={true}
                    label={"Nome da Faixa"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <InputText
                    type="text"
                    placeholder="Quebramento"
                    required={true}
                    label={"Quebramento da Faixa"}
                    value={breakdown}
                    onChange={(e) => setBreakdown(e.target.value)}
                />
            </section>
            <section className={styles.containerTextArea}>
                <label>
                    <h5>Teoria</h5>
                    <textarea
                        rows={2}
                        placeholder="Descreva a Teoria da Faixa"
                        required={true}
                        value={theory}
                        onChange={(e) => setTheory(e.target.value)}
                    />
                </label>
                <label>
                    <h5>Significado</h5>
                    <textarea
                        rows={2}
                        placeholder="Qual o Significado da Faixa"
                        required={true}
                        value={meaning}
                        onChange={(e) => setMeaning(e.target.value)}
                    />
                </label>
                <label>
                    <h5>Flexibilidade</h5>
                    <textarea
                        rows={2}
                        placeholder="Quais os Movimentos de Flexibilidade"
                        required={true}
                        value={stretching}
                        onChange={(e) => setStretching(e.target.value)}
                    />
                </label>
            </section>
        </FormCreate>
    )
}