import FormCreate from "../../components/commons/Forms/FormCreate";
import React, {useEffect, useState} from "react";
import KickService from "../../services/kick";
import KickForm from "../../components/Kick/Form";

export default function CreateKick() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [preloadData, setPreloadData] = useState({});

    useEffect(() => {
        setPreloadData(JSON.parse(localStorage.getItem('Criar-Chute')))
    }, [])

    useEffect(() => {
        if (preloadData) {
            const { name, description } = preloadData;
            setName(name)
            setDescription(description)
        }
    }, [preloadData])

    const defaultInputs = async () => {
        setName('')
        setDescription('')
    }

    return (
        <FormCreate data={{name, description}} defaultInputs={defaultInputs} serviceCreate={KickService.create}
                    titlePage={"Criar Chute"} messageSuccess={"Continuar criando?"}
                    messageError={"Erro ao criar o chute"} redirectTo={'/chute'}>
            <KickForm name={name} description={description} setName={setName} setDescription={setDescription} />
        </FormCreate>
    )
}