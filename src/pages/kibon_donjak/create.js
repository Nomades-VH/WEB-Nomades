import InputText from "../../components/commons/inputs/InputText";
import FormCreate from "../../components/commons/Forms/FormCreate";
import React, {useState} from "react";
import KibonDonjakService from "../../services/kibon_donjak";
import KibonDonjakForm from "../../components/KibonDonjak/Form";

export default function CreateKibonDonjak() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const defaultInputs = async () => {
        setName('')
        setDescription('')
    }

    return (
        <FormCreate data={{name, description}} serviceCreate={KibonDonjakService.create}
                    titlePage={"Criar Kibon Donjak"} messageSuccess={"Continuar criando?"}
                    messageError={"Erro ao criar kibon Donjak"} redirectTo={'/apostilas'} defaultInputs={defaultInputs}>
            <KibonDonjakForm name={name} description={description} setName={setName} setDescription={setDescription} />
        </FormCreate>
    )
}