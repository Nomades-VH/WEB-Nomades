import style from './styles.module.scss'
import Link from "next/link";

function Footer(props) {
    return (
        <>
            {
                props.logged ? (
                    <div></div>
                ) : (
                    <div className={style.main}>
                        <p>
                            Para ter acesso a todas as funcionalidades do sistema é necessário realizar o login.
                        </p>
                        <p>
                            Caso não tenha acesso, converse com o professor responsável de seu Do-jo. Se não for aluno, encontre um professor mais próximo de você.
                        </p>
                        <Link href={'https://api.whatsapp.com/send/?phone=5512996140543'}>Contato</Link>
                    </div>
                )
            }

        </>
    )
}

export default Footer;