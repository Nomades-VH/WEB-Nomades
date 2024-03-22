import style from './styles.module.scss'
import Link from "next/link";
import {useAuth} from "../../context/AuthContext";

export default function Footer() {
    const { isAuthenticated } = useAuth();

    return (
        <>
            {
                isAuthenticated ? (
                    <div className={style.main}>
                        <p>Caso encontre algum erro no sistema, favor contactar com o seguinte número de whatsapp</p>
                        <Link href={'https://api.whatsapp.com/send/?phone=5512996140543'}>Contato</Link>
                    </div>
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
