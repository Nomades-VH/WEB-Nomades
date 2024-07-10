import React, {useEffect, useState} from "react";
import FormCreate from "../../components/commons/Forms/FormCreate";
import InputText from "../../components/commons/inputs/InputText";
import InputPassword from "../../components/commons/inputs/InputPassword";
import Select from "../../components/commons/inputs/Select";
import {useNavigate} from "react-router-dom";
import BandService from "../../services/band";
import {useAuth} from "../../context/AuthContext";
import UserService from "../../services/user";
import Loading from "../../components/commons/Loading";

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
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [permission, setPermission] = useState(2);
    const [hub, setHub] = useState('');
    const [fkBand, setFkBand] = useState(null)
    const [bands, setBands] = useState([]);

    useEffect(() => {
        const loadBand = async () => {
            try {
                if (parseInt(user.permission) >= 3) {
                    const result = await BandService.get();
                    if (result) {
                        setBands(result);
                    } else {
                        setBands([])
                    }
                } else {
                    navigate("/")
                }
            } catch (error) {
                setBands([])
            }
        };
        loadBand();
    }, [user, navigate]);

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

    if (user) {

        return (
            <FormCreate data={{credentials, permission, hub, fkBand}}
                        titlePage={"Criar usuário"} messageSuccess={"Continuar criando usuário?"}
                        messageError={"Erro ao criar usuário"} serviceCreate={UserService.create_user}
                        defaultInputs={defaultInputs} redirectTo={"/"}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
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
                                    label: key,
                                    value: Hubs[key]
                                }))}></Select>
                        {bands ?
                            <Select label={"Faixa do aluno"} onChange={(e) => setFkBand(e.target.value)}
                                    options={bands?.map((band) => ({
                                        label: band.name,
                                        value: band.id
                                    }))}></Select>
                            : null
                        }
                    </section>
                </div>
            </FormCreate>
        )
    } else {
        return <Loading/>
    }
}