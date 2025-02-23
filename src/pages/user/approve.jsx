import React, { useEffect, useState } from "react";
import UserService from "../../services/user";
import styles from "./approve.module.scss"


export default function ApproveUsers({ toast }) {
    const [users, setUsers] = useState([]); // Inicializamos como um array vazio

    // Função para buscar todos os usuários
    useEffect(() => {
        UserService.get_all()
            .then((response) => {
                setUsers(response); // Define o estado com a lista de usuários
                toast.success('Usuários recebidos.')
            })
            .catch((error) => {
                setUsers([]); // Em caso de erro, define como lista vazia
                toast.error('Não foi possível encontrar os usuários.')

            });
    }, [toast]);

    const toggleUserStatus = (userId, newStatus) => {
        UserService.approve_users_deactivates([userId])
            .then(() => {
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === userId ? { ...user, is_active: newStatus } : user
                    )
                );

                toast.success(newStatus ? 'Ativado com sucesso.' : 'Desativado com sucesso.')
            })
            .catch((error) => {
                console.error("Erro ao atualizar o status do usuário:", error);
                alert("Falha ao atualizar o status do usuário. Tente novamente.");
            });
    };

    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th><p>Username</p></th>
                        <th><p>Email</p></th>
                        <th><p>Active</p></th>
                    </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id} className={styles.row}>
                    <td><p>{user.username}</p></td>
                    <td><p>{user.email}</p></td>
                    <td>
                        <input
                        type="checkbox"
                        checked={user.is_active}
                        onChange={(e) => toggleUserStatus(user.id, e.target.checked)}
                        />
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>

    );
}
