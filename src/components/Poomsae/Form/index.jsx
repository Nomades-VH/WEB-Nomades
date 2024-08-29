import InputText from "../../commons/inputs/InputText";

export default function PoomsaeForm({name, description, setName, setDescription}) {
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
    )
}