import React, {useEffect, useState} from "react";
import FormCreate from "../../components/commons/FormCreate";
import InputText from "../../components/commons/inputs/InputText";
import InputPassword from "../../components/commons/inputs/InputPassword";
import Select from "../../components/commons/inputs/Select";
import {useNavigate} from "react-router-dom";
import BandService from "../../services/band";
import {useAuth} from "../../context/AuthContext";
import UserService from "../../services/user";

class Hubs {
    static Areias = "areias";
    static SJBarreiro = "sjbarreiro";
    static Piquete = "piquete";
    static Silveiras = "silveiras";

    static getKeyByValue(value) {
        return Object.keys(Hubs).find(key => Hubs[key] === value);
    }
}

export default function CreateUser() {
    const navigate = useNavigate();
    const {user} = useAuth();
    const [token, setToken] = useState('')
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [permission, setPermission] = useState(2);
    const [hub, setHub] = useState('');
    const [fkBand, setFkBand] = useState(null)
    const [bands, setBands] = useState();

    useEffect(() => {
        const loadBand = async () => {
            try {
                if (parseInt(user.permission) >= 3) {
                    setToken(localStorage.getItem('access_token'));
                    const result = await BandService.get(token);
                    if (result) {
                        setBands(result);
                    }
                } else {
                    navigate("/")
                }
            } catch (error) {
            }
        };
        loadBand();
    }, [user, token, navigate]);

    const defaultInputs = async () => {
        setUsername('');
        setEmail('');
        setPassword('');
    }

    const credentials = {
        username: username,
        email: email,
        password: password
    }

    return (
        <FormCreate token={token} data={{credentials, permission, hub, fkBand}}
                    titlePage={"Criar usuário"} messageSuccess={"Continuar criando usuário?"}
                    messageError={"Erro ao criar usuário"} serviceCreate={UserService} defaultInputs={defaultInputs}>
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
            <section>
                <Select label={"Permissão"} options={[{label: "Aluno", value: permission}]}
                        onChange={(e) => setPermission(e.target.value)}>
                </Select>
                <Select label={"Cidade"} onChange={(e) => setHub(e.target.value)}
                        options={Object.keys(Hubs).map((key) => ({
                            label: key, // O valor representa diretamente a cidade
                            value: Hubs[key] // O valor também é a cidade neste caso
                        }))}></Select>
                {bands ? <Select label={"Faixa do aluno"} onChange={(e) => setFkBand(e.target.value)}
                                 options={bands?.map((band) => ({
                                     label: band.name, // O valor representa diretamente a cidade
                                     value: band.id // O valor também é a cidade neste caso
                                 }))}></Select> :
                    <h4 style={{marginTop: 45}}>Não será possível criar o usuário</h4>}
            </section>
        </FormCreate>
    )
}