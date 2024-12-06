import InputText from "../../../components/commons/inputs/InputText";
import InputPassword from "../../../components/commons/inputs/InputPassword";
import InputImage from "../../../components/commons/inputs/InputImage";
import Select from "../../../components/commons/inputs/Select";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import BandService from "../../../services/band";
import Image from "next/image";


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
    setFkBand,
    confirmPassword,
    setConfirmPassword,
    profile,
    setProfile
}) {

    const {user} = useAuth();
    const [gettedBands, setGettedBands] = useState();
    const [passwordIsEqual, setPasswordIsEqual] = useState(false);
    const [previousProfile, setPreviousProfile] = useState();


    useEffect(() => {
        const loadBand = async () => {
            try {
                const result = await BandService.get();
                result ? setGettedBands(result) : setGettedBands([]);
                
            } catch (error) {
                setGettedBands([])
            }
        };
        loadBand();
    }, [user]);

    const changeProfile = (image) => {
        const imageUrl = URL.createObjectURL(image);
        setProfile(image)
        setPreviousProfile(imageUrl)
    }

    const band = gettedBands?.find((band) => band.id === fkBand);
    const preloadFkBand = band ? {label: band.name, value: band.id} : "";

    useEffect(() => {
        setPasswordIsEqual(password === confirmPassword)
    }, [password, confirmPassword])

    useEffect(() => {
        passwordIsEqual ? console.log("IUHULLL") : console.log("AFF")
    }, [passwordIsEqual])
    
    const preloadHub = hub ? {
        label: Hubs.getKeyByValue(hub),
        value: hub
    } : "";

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
                    label={"Senha"} required={!passwordIsEqual}
                    onChange={(e) => {
                        setPassword(e.target.value)
                        e.target.setCustomValidity(!passwordIsEqual ? "" : "As senhas não coincidem.");
                    }}
                    value={password} minlength="8"/>
                <InputPassword
                name="confirmation"
                placeholder={'Confirme sua senha'}
                label={"Confirmação de senha"} required={!passwordIsEqual}
                onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    e.target.setCustomValidity(!passwordIsEqual ? "" : "As senhas não coincidem.");
                }}
                value={confirmPassword}
                minlength="8"
                />
                
            </section>
            <section style={{display: "flex"}}>
            <InputImage label="Imagem de perfil" onChange={(e) => changeProfile(e.target.files[0])}/>
            {previousProfile && <Image src={previousProfile} width={80} height={80} alt="Previsão da foto de perfil"/>}
            </section>
            
            <section style={{display: "flex", gap: '10px'}}>
                <Select value={permission} label={"Permissão"} options={[{label: "Aluno", value: 2}]}
                        onChange={(e) => setPermission(e.value)} isUnique={true} required={true} />
                <Select label={"Cidade"} onChange={(e) => setHub(e.value)} isUnique={true}
                        defaultValue={preloadHub}
                        options={Object.keys(Hubs).map((key) => ({
                            label: key,
                            value: Hubs[key]
                        }))} required={true} />
                
                <Select label={"Faixa do aluno"} 
                defaultValue={preloadFkBand}
                onChange={(e) => setFkBand(e.value)} isUnique={true}
                        options={gettedBands?.map((band) => ({
                            label: band.name,
                            value: band.id
                        }))} required={true} />
            </section>
        </div>
    )
}