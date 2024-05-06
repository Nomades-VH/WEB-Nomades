import InputText from "../../components/commons/inputs/InputText";
import FormCreate from "../../components/commons/FormCreate";
import React, {useState} from "react";

export default function CreateKibonDonjak() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    return (
        <FormCreate >
            <section>
                <InputText
                    type="text"
                    placeholder="Nome"
                    required={true}
                    label={"Nome do Kibon Donjak"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label>
                    <h5>Descrição</h5>
                    <textarea
                        rows={2}
                        placeholder="Descreva o Kibon Donjak"
                        required={true}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
            </section>
        </FormCreate>
    )
}