import React, {useEffect, useState} from "react";
import FormCreate from "../../components/commons/Forms/FormCreate";
import {useNavigate} from "react-router-dom";
import BandService from "../../services/band";
import {useAuth} from "../../context/AuthContext";
import UserService from "../../services/user";
import Loading from "../../components/commons/Loading";
import UserForm from "../../components/User/Form";


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
    const [preloadData, setPreloadData] = useState();

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
    }, [preloadData, hub])

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
                        titlePage={"Criar Usuário"} messageSuccess={"Continuar criando usuário?"}
                        messageError={"Erro ao criar usuário"} serviceCreate={UserService.create_user}
                        defaultInputs={defaultInputs} redirectTo={"/"}>
                <UserForm 
                    username={username} 
                    setUsername={setUsername}
                    email={email}
                    setEmail={setEmail}
                    permission={permission}
                    setPermission={setPermission}
                    hub={hub}
                    setHub={setHub}
                    bands={bands}
                    setFkBand={setFkBand}
                    preloadUsername={username}
                    preloadEmail={email}
                    preloadPermission={permission}
                    preloadHub={hub}
                    preloadFkBand={fkBand}
                />
            </FormCreate>
        )
    } else {
        return <Loading/>
    }
}