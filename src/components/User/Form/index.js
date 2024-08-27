import InputText from "../../commons/inputs/InputText";
import InputText from "../../components/commons/inputs/InputText";
import InputPassword from "../../components/commons/inputs/InputPassword";
import Select from "../../components/commons/inputs/Select";


class Hubs {
    static Areias = "areias";
    static SJBarreiro = "sjbarreiro";
    static Piquete = "piquete";
    static Silveiras = "silveiras";

    static getKeyByValue(value) {
        return Object.keys(Hubs).find(key => Hubs[key] === value);
    }
}

export default function UserForm({
    username,
    setUsername,
    email,
    setEmail,
    permission,
    setPermission,
    hub,
    setHub,
    bands,
    setFkBand
}) {
    return (
        <div>
            <section>
                <InputText
                    type="text"
                    placeholder="Usuário"
                    value={username}
                    required={true}
                    label={"Nome de usuário"}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <InputText
                    type="email"
                    placeholder="Email"
                    value={email}
                    label={"Email"}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputPassword
                    name="password"
                    placeholder={'Insira sua senha'}
                    label={"Senha"} required={true}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}/>
            </section>
            <section style={{display: 'flex', gap: '10px'}}>
                <Select label={"Permissão"} options={[{label: "Aluno", value: permission}]}
                        onChange={(e) => setPermission(e.value)} isUnique={true}>
                </Select>
                <Select label={"Cidade"} onChange={(e) => setHub(e.value)} isUnique={true}
                        defaultValue={hub}
                        options={Object.keys(Hubs).map((key) => ({
                            label: key,
                            value: Hubs[key]
                        }))}></Select>
                {bands ?
                    <Select label={"Faixa do aluno"} onChange={(e) => setFkBand(e.value)} isUnique={true}
                            options={bands?.map((band) => ({
                                label: band.name,
                                value: band.id
                            }))}></Select>
                    : null
                }
            </section>
        </div>
    )
}