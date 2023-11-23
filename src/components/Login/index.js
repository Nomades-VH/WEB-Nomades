import Form from "../commons/Form";
import InputPassword from "../commons/inputs/InputPassword";
import InputText from "../commons/inputs/InputText";
import Button from "../commons/Button";
import styles from './styles.module.scss'
import Image from "next/image";
import logo from '../../public/images/Logo.jpeg'
import headerImage from '../../public/images/faixa-sem-logo-amarelo.png'
import Link from "next/link";
import {login} from "../../services/login";
import {useState} from "react";

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const result = await login(username, password);
            console.log(username, password)
            console.log(result);
            console.log(result.data);
            console.log(result.data.access_token);
            localStorage.setItem("access_token", result.data.access_token)
        } catch (error) {
            console.error('Erro durante o login', error)
        }
    }
    return (
        <div className={styles.main}>
            <Image src={headerImage} alt={'faixa'} className={styles.band}/>

            <div className={styles.container}>
                <div className={styles.div}>
                    <Form className={styles.form} onSubmit={handleLogin}>
                        <label>
                            <h2>Entrar</h2>
                        </label>
                        <section>
                            <label><h3>Usuário</h3></label>
                            <InputText name="username" placeholder={'E-mail ou usuário'} required={true} onChange={(e) => setUsername(e.target.value)}/>
                            <label><h3>Senha</h3></label>
                            <InputPassword name="password" placeholder={'Insira sua senha'} required={true} onChange={(e) => setPassword(e.target.value)}/>
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
}

export default Login;