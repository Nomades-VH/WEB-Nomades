import Form from "../commons/Form";
import InputPassword from "../commons/inputs/InputPassword";
import InputText from "../commons/inputs/InputText";
import Component from "../commons/Button";
import styles from './styles.module.scss'
import Image from "next/image";
import logo from '../../public/images/Logo.jpeg'

function Login() {
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <Image src={logo} alt="logo" width={300} height={300} />
                <h2>Entrar</h2>
                <Form className={styles.form}>
                    <InputText placeholder={'E-mail ou usuário'} required={true}/>
                    <InputPassword placeholder={'Insira sua senha'} required={true}/>
                    <Component label={'Entrar'}/>
                </Form>
            </div>
        </div>


    )
}

export default Login;