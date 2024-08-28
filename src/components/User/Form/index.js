import InputText from "../../../components/commons/inputs/InputText";
import InputPassword from "../../../components/commons/inputs/InputPassword";
import Select from "../../../components/commons/inputs/Select";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import Loading from "../../commons/Loading";
import {useNavigate} from "react-router-dom";
import BandService from "../../../services/band";



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
    password,
    setPassword,
    permission,
    setPermission,
    hub,
    setHub,
    fkBand,
    setFkBand
}) {

    const {user} = useAuth();
    const [gettedBands, setGettedBands] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const loadBand = async () => {
            try {
                if (parseInt(!user.permission >= 3)) {
                    navigate("/")
                }
                const result = await BandService.get();
                result ? setGettedBands(result) : setGettedBands([]);
                
            } catch (error) {
                setGettedBands([])
            }
        };
        loadBand();
    }, [user, navigate]);

    const band = gettedBands?.find((band) => band.id === fkBand);
    const preloadFkBand = band ? {label: band.name, value: band.id} : "";
    
    const preloadHub = hub ? {
        label: Hubs.getKeyByValue(hub),
        value: hub
    } : "";

    if (!user) {
        return <Loading />
    }

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
                <Select label={"Permissão"} options={[{label: "Aluno", value: 2}]}
                        onChange={(e) => setPermission(e.value)} isUnique={true}>
                </Select>
                <Select label={"Cidade"} onChange={(e) => setHub(e.value)} isUnique={true}
                        defaultValue={preloadHub}
                        options={Object.keys(Hubs).map((key) => ({
                            label: key,
                            value: Hubs[key]
                        }))}></Select>
                
                    <Select label={"Faixa do aluno"} 
                    defaultValue={preloadFkBand}
                    onChange={(e) => setFkBand(e.value)} isUnique={true}
                            options={gettedBands?.map((band) => ({
                                label: band.name,
                                value: band.id
                            }))}>

                            </Select>
            </section>
        </div>
    )
}