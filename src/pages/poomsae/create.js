import React, {useState} from "react";
import InputText from "../../components/commons/inputs/InputText";
import FormCreate from "../../components/commons/FormCreate";

export default function CreatePoomsae() {
    const [name, setName] = useState('');
    const [meaning, setMeaning] = useState('');

    return (
        <FormCreate >
            <section>
                <InputText
                    type="text"
                    placeholder="Nome"
                    required={true}
                    label={"Nome do Poomsae"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label>
                    <h5>Significado</h5>
                    <textarea
                        rows={2}
                        placeholder="Significado do Poomsae"
                        required={true}
                        value={meaning}
                        onChange={(e) => setMeaning(e.target.value)}
                    />
                </label>
            </section>
        </FormCreate>
    )

}