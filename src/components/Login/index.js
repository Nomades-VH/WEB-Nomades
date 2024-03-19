import Form from "../commons/Form";
import InputPassword from "../commons/inputs/InputPassword";
import InputText from "../commons/inputs/InputText";
import Button from "../commons/Button";
import styles from './styles.module.scss'
import Image from "next/image";
import logo from '../../public/images/Logo.jpeg'
import headerImage from '../../public/images/faixa-sem-logo-amarelo.png'
import Link from "next/link";
import {useState} from "react";
import { useAuth } from "../../context/AuthContext";
import { router } from "next/router"

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, isAuthenticated } = useAuth();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await login(username, password);
            if (response) {
                router.push('/')
            }
        } catch (error) {
            alert("Usuário ou senha incorreto.")
        }
    }
    if (!isAuthenticated) {
        return (
            <div className={styles.main}>

                <Image src={headerImage} alt={'faixa'} className={styles.band}/>
                <button id="mensagem-sucesso">
                    Exibir mensagem de sucesso
                </button>

                <div className={styles.container}>
                    <div className={styles.div}>
                        <Form className={styles.form} onSubmit={handleLogin}>
                            <label>
                                <h2>Entrar</h2>
                            </label>
                            <section>
                                <label><h3>Usuário</h3></label>
                                <InputText name="username" placeholder={'E-mail ou usuário'} required={true}
                                           onChange={(e) => setUsername(e.target.value)}/>
                                <label><h3>Senha</h3></label>
                                <InputPassword name="password" placeholder={'Insira sua senha'} required={true}
                                               onChange={(e) => setPassword(e.target.value)}/>
                            </section>
                            <Button label={'Entrar'}/>
                        </Form>
                    </div>
                    <div className={styles.div}>
                        <Link href={'/'}>
                            <Image alt={'Logo'} src={logo} className={styles.logo}/>
                        </Link>
                    </div>
                </div>
            </div>
        )
    } else {
        router.push("/");
    }
}

export default Login;