import InputText from "../../commons/inputs/InputText";

export default function KickForm({name, description, setName, setDescription}) {
    return (
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
    )
}