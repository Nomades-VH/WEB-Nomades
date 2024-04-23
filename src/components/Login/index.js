import Form from "../commons/Form";
import InputPassword from "../commons/inputs/InputPassword";
import InputText from "../commons/inputs/InputText";
import Button from "../commons/Button";
import styles from './styles.module.scss'
import React, {useState} from "react";
import {useAuth} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import Alert from "../commons/Alert";
import Loading from "../commons/Loading";

function validarEmail(email) {
    // Expressão regular para validar e-mails
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function Login({redirectTo = "/"}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, isAuthenticated} = useAuth();
    const navigate = useNavigate();
    const [openAlertNotStudent, setOpenAlertNotStudent] = useState(false);
    const [openAlert, setOpenAlert] = useState(false)
    const [errorMessage, setErrorMessage] = useState('Email ou senha incorreta.')
    let [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false)

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            setLoading(true)
            if (validarEmail(email)) {
                const response = await login(email, password);
                if (response) {
                    navigate(redirectTo)
                } else {
                    setErrorMessage('Email ou senha incorreta.')
                    setCount(count+1)
                    if (count >= 2) {
                        setCount(0)
                        setOpenAlertNotStudent(true)
                    } else {
                        setOpenAlert(true)
                    }
                }
            } else {
                setErrorMessage("Email inválido.")
                setCount(count+1)
                if (count >= 2) {
                    setCount(0)
                    setOpenAlertNotStudent(true)
                } else {
                    setOpenAlert(true)
                }
            }
        } catch (error) {
            setCount(count+1)
            if (count >= 2) {
                setCount(0)
                setOpenAlertNotStudent(true)
            } else {
                setOpenAlert(true)
            }
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <Loading />
    }

    if (!isAuthenticated) {
        return (
            <div className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.div}>
                        <Form className={styles.form} onSubmit={handleLogin}>
                            <label>
                                <h2>Entrar</h2>
                            </label>
                            <section>
                                <InputText name="email" placeholder={'Digite seu E-mail'} required={true}
                                           onChange={(e) => setEmail(e.target.value)} label={"Email"} value={email}/>
                                <InputPassword name="password" placeholder={'Insira sua senha'} label={"Senha"} required={true}
                                               onChange={(e) => setPassword(e.target.value)} value={password}/>
                            </section>
                            <Button>Entrar</Button>
                        </Form>
                    </div>
                </div>
                <Alert isOpen={openAlertNotStudent} setAlertOpen={() => setOpenAlertNotStudent(!openAlertNotStudent)} textClose="Não"
                       hasButtons={true} textContinue={"Sim"} redirectOtherPage='https://api.whatsapp.com/send?phone=5512996140543&text=Ol%C3%A1!%20Gostaria%20de%20me%20tornar%20aluno%20da%20equipe%20n%C3%B4mades%20do%20vale%20hist%C3%B3rico.'>
                    <div>
                        <p>É aluno dos nômades?</p>
                    </div>
                </Alert>
                <Alert isOpen={openAlert} setAlertOpen={() => setOpenAlert(!openAlert)} textClose="Tirar dúvida"
                       hasButtons={true} textContinue={"Fechar"} redirectOtherPage='https://api.whatsapp.com/send/?phone=5512996140543'>
                    <div>
                        <p>{errorMessage}</p>
                    </div>
                </Alert>

            </div>
        )
    } else {
        navigate(redirectTo)
    }
}

export default Login;