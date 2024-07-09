import DisplayPage from "../../components/DisplayPage";
import FormCreate from "../../components/commons/FormCreate";
import React, {useState} from "react";
import InputText from "../../components/commons/inputs/InputText";
import KickService from "../../services/kick";

export default function CreateKick() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const defaultInputs = async () => {
        setName('')
        setDescription('')
    }

    return (
        <FormCreate data={{name, description}} defaultInputs={defaultInputs} serviceCreate={KickService.create}
                    titlePage={"Criar Chute"} messageSuccess={"Continuar criando?"}
                    messageError={"Erro ao criar o chute"} redirectTo={'/chute'}>
            <section>
                <InputText
                    type="text"
                    placeholder="Nome"
                    required={true}
                    label={"Nome do Chute"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label>
                    <h5>Descrição</h5>
                    <textarea
                        rows={2}
                        placeholder="Descreva o chute"
                        required={true}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
            </section>
        </FormCreate>
    )
}