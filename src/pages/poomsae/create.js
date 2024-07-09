import React, {useState} from "react";
import InputText from "../../components/commons/inputs/InputText";
import FormCreate from "../../components/commons/FormCreate";
import PoomsaeService from "../../services/poomsae";

export default function CreatePoomsae() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const defaultInputs = async () => {
        setName('')
        setDescription('')
    }

    function countWhitespace(str) {
        let count = 0;
        for (let i = 0; i < str.length; i++) {
            if (str[i] === ' ') {
                count++;
            }
        }
        return count;
    }

    return (
        <FormCreate data={{name, description}}
                    titlePage={"Criar Poomsae"} messageSuccess={"Continuar criando?"}
                    messageError={"Erro ao criar Poomsae"} redirectTo={'/poomsae'} serviceCreate={PoomsaeService.create} defaultInputs={defaultInputs}>
            <section>
                <InputText
                    type="text"
                    placeholder="Nome"
                    required={true}
                    label={"Nome do Poomsae"}
                    value={name}
                    onChange={(e) => {
                        const cursorPosition = e.target.selectionStart;

                        if (countWhitespace(e.target.value) >= 2)  {
                            if (!e.target.value.includes("Jang")) {
                                e.target.value += "Jang";
                                e.target.setSelectionRange(cursorPosition, cursorPosition);
                            }
                        } else {
                            console.log("AOBCA")
                            console.log(e.target.value.includes("Jang"))
                            e.target.value = e.target.value.replace("Jang", "")
                        }
                        setName(e.target.value)
                    }}
                />

                <label>
                    <h5>Significado</h5>
                    <textarea
                        rows={2}
                        placeholder="Significado do Poomsae"
                        required={true}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
            </section>
        </FormCreate>
    )

}