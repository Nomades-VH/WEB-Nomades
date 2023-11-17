import styles from './poomsae.module.scss'
import Link from 'next/link';
import {useEffect, useState} from "react";
import axios from "axios";

export default function Poomsae(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const api = axios.create({
        baseUrl: "http://localhost:8000"
    });

    const getData = async () => {
        try {
            const response = await api.get('/poomsae')
            setItems(response);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            {items.map((poomsae) => (
                <div key={poomsae.uuid}>
                    {poomsae}
                </div>
                ))}
        </div>
    )

}