import React, {useEffect, useState} from "react";
import InputText from "../../components/commons/inputs/InputText";
import FormCreate from "../../components/commons/Forms/FormCreate";
import PoomsaeService from "../../services/poomsae";
import PoomsaeForm from "../../components/Poomsae/Form";

export default function CreatePoomsae() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [preloadData, setPreloadData] = useState();

    useEffect(() => {
        setPreloadData(JSON.parse(localStorage.getItem('Criar-Kibon-Donjak')))
    }, [])

    useEffect(() => {
        if (preloadData) {
            const { name, description } = preloadData;
            setName(name)
            setDescription(description)
        }
    }, [preloadData])

    const defaultInputs = async () => {
        setName('');
        setDescription('');
    }

    return (
        <FormCreate data={{name, description}}
                    titlePage={"Criar Poomsae"} messageSuccess={"Continuar criando?"}
                    messageError={"Erro ao criar Poomsae"} redirectTo={'/poomsae'} serviceCreate={PoomsaeService.create} defaultInputs={defaultInputs}>
            <PoomsaeForm name={name} description={description} setName={setName} setDescription={setDescription} />
        </FormCreate>
    )

}