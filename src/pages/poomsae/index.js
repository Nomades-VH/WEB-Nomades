import styles from './poomsae.module.scss'
import Link from 'next/link';
import {useEffect, useState} from "react";

export default function Poomsae(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("https://localhost:8000/poomsae")
            .then(res => res.json())
            .then(
                result => {
                    setIsLoaded(true);
                    setItems(result);
                },
                error => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else if (items) {
        return (
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name} {item.description}
                    </li>
                ))}
            </ul>
        )
    }
    return <div>Não existem poomsaes criados</div>

}