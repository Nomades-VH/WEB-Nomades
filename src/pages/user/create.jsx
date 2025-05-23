import React, {useEffect, useState} from "react";
import FormCreate from "../../components/commons/Forms/FormCreate";
import UserService from "../../services/user";
import UserForm from "../../components/User/Form";


export default function CreateUser() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [permission, setPermission] = useState(1);
    const [bio, setBio] = useState('');
    const [hub, setHub] = useState('');
    const [fkBand, setFkBand] = useState(null)
    const [profile, setProfile] = useState();
    const [preloadData, setPreloadData] = useState();
    const [confirmPassword, setConfirmPassword] = useState('');
    

    useEffect(() => {
        setPreloadData(JSON.parse(localStorage.getItem('Criar-Usuário')))
    }, [])

    useEffect(() => {
        if (preloadData) {
            const { credentials, permission, hub, fkBand, profile, bio } = preloadData;
            setUsername(credentials.username)
            setEmail(credentials.email)
            setPermission(permission)
            setHub(hub)
            setBio(bio)
            setFkBand(fkBand)
            setProfile(profile)
        }
    }, [preloadData])

    const defaultInputs = async () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setBio('')
    }

    const credentials = {
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword
    }
    
    return (
        <FormCreate data={{credentials, permission, hub, fkBand, profile, bio}}
                    titlePage={"Criar Usuário"} messageSuccess={"Continuar criando usuário?"}
                    messageError={"Erro ao criar usuário"} serviceCreate={UserService.create_user}
                    defaultInputs={defaultInputs} redirectTo={"/apostilas"}>
            <UserForm 
                username={username} 
                setUsername={setUsername}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                permission={permission}
                setPermission={setPermission}
                hub={hub}
                setHub={setHub}
                bio={bio}
                setBio={setBio}
                fkBand={fkBand}
                setFkBand={setFkBand}
                profile={profile}
                setProfile={setProfile}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
            />
        </FormCreate>
    )
}