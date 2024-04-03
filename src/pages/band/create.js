import FormCreate from "../../components/commons/FormCreate";
import InputText from "../../components/commons/inputs/InputText";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import BandService from "../../services/band";

export default function CreateBand() {

    const [gub, setGub] = useState();
    const [name, setName] = useState('');
    const [meaning, setMeaning] = useState('');
    const [theory, setTheory] = useState('');
    const [breakdown, setBreakdown] = useState('');
    const [stretching, setStretching] = useState('');
    const [token, setToken] = useState('')
    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (parseInt(user.permission) >= 3) {
            setToken(localStorage.getItem('access_token'));
        } else {
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
        <FormCreate token={token} data={{gub, name, meaning, theory, breakdown, stretching}}
                    titlePage={"Criar usuário"} messageSuccess={"Continuar criando faixa?"}
                    messageError={"Erro ao criar faixa."} serviceCreate={BandService.create} defaultInputs={defaultInputs}
        redirectTo={"/apostilas"}>
            <section>
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
                    placeholder="Significado"
                    required={true}
                    label={"Significado da Faixa"}
                    value={meaning}
                    onChange={(e) => setMeaning(e.target.value)}
                />
            </section>
            <section>
                <InputText
                    type="text"
                    placeholder="Teoria"
                    required={true}
                    label={"Teoria da Faixa"}
                    value={theory}
                    onChange={(e) => setTheory(e.target.value)}
                />
                <InputText
                    type="text"
                    placeholder="Quebramento"
                    required={true}
                    label={"Quebramento da Faixa"}
                    value={breakdown}
                    onChange={(e) => setBreakdown(e.target.value)}
                />
                <InputText
                    type="text"
                    placeholder="Flexibilidade"
                    required={true}
                    label={"Flexibilidade da Faixa"}
                    value={stretching}
                    onChange={(e) => setStretching(e.target.value)}
                />
            </section>
        </FormCreate>
    )
}