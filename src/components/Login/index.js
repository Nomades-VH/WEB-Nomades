import Form from "../commons/Form";
import InputPassword from "../commons/inputs/InputPassword";
import InputText from "../commons/inputs/InputText";
import Component from "../commons/Button";
import styles from './styles.module.scss'
import Image from "next/image";
import logo from '../../public/images/Logo.jpeg'
import Link from "next/link";

function Login() {
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <Form className={styles.form}>
                    <label>
                        <h2>Entrar</h2>
                    </label>
                    <section>
                        <label><h3>Usuário</h3></label>
                        <InputText placeholder={'E-mail ou usuário'} required={true}/>
                        <label><h3>Senha</h3></label>
                        <InputPassword placeholder={'Insira sua senha'} required={true}/>
                    </section>
                        <Component label={'Entrar'}/>

                </Form>
                <Link href={"/"}>
                    <Image src={logo} alt="logo" width={600} height={600} />
                </Link>
            </div>
        </div>


    )
}

export default Login;