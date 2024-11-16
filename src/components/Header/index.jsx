import Image from 'next/image';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import logo from '../../../public/images/LogoAtual-removebg-preview.png'
import {useAuth} from "../../context/AuthContext";
import Logged from "./info/logged";
import Unlogged from "./info/unlogged";
import { useEffect, useState } from 'react';
import UserService from '../../services/user';

export default function Header() {
    const { user, isAuthenticated } = useAuth();

    return (
        <header className={styles.container}>
            <section className={styles.logo}>
                <Link to='/'>
                    <Image src={logo} width={100} height={100} alt="Logo da equipe Nômades"/>
                </Link>
            </section>
            <section>
                <Link to="/"><h2>Nômades Vale Histórico</h2></Link>
            </section>

            <section>
            {
                isAuthenticated && user ? (
                    <Logged user={user} />
                ) : (
                    <Unlogged />
                )
            }
            </section>
        </header>
    );
}