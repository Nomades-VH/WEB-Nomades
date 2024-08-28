import React, {useEffect, useState} from "react";
import FormCreate from "../../components/commons/Forms/FormCreate";
import UserService from "../../services/user";
import UserForm from "../../components/User/Form";


export default function CreateUser() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [permission, setPermission] = useState(2);
    const [hub, setHub] = useState('');
    const [fkBand, setFkBand] = useState(null)
    const [preloadData, setPreloadData] = useState();

    useEffect(() => {
        setPreloadData(JSON.parse(localStorage.getItem('Criar-Usuário')))
    }, [])

    useEffect(() => {
        if (preloadData) {
            const { credentials, permission, hub, fkBand } = preloadData;
            setUsername(credentials.username)
            setEmail(credentials.email)
            setPermission(permission)
            setHub(hub)
            setFkBand(fkBand)
        }
    }, [preloadData])

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
        <FormCreate data={{credentials, permission, hub, fkBand}}
                    titlePage={"Criar Usuário"} messageSuccess={"Continuar criando usuário?"}
                    messageError={"Erro ao criar usuário"} serviceCreate={UserService.create_user}
                    defaultInputs={defaultInputs} redirectTo={"/"}>
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
                fkBand={fkBand}
                setFkBand={setFkBand}
            />
        </FormCreate>
    )
}