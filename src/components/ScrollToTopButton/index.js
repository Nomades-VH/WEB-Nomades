import React, {useState, useEffect} from 'react';
import styles from "./index.module.scss";
import {GoMoveToTop} from "react-icons/go";

function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    // Função para rolar suavemente para o topo da página
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Adicione um event listener para verificar a posição de rolagem
    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 2500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <button
            onClick={scrollToTop}
            className={isVisible ? styles.topBtn : styles.topBtnUnshow}
        >
            <GoMoveToTop/>
        </button>
    );
}

export default ScrollToTopButton;
