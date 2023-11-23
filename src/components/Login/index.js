import Form from "../commons/Form";
import InputPassword from "../commons/inputs/InputPassword";
import InputText from "../commons/inputs/InputText";
import Button from "../commons/Button";
import styles from './styles.module.scss'
import Image from "next/image";
import logo from '../../public/images/Logo.jpeg'
import headerImage from '../../public/images/faixa-sem-logo-amarelo.png'
import Link from "next/link";

function Login() {
    return (
        <div className={styles.main}>
            <Image src={headerImage} alt={'faixa'} className={styles.band}/>

            <div className={styles.container}>
                <div className={styles.div}>
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