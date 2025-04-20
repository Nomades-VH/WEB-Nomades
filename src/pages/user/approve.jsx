import React, { useEffect, useState } from "react";
import UserService from "../../services/user";
import styles from "./approve.module.scss"
import Select from "../../components/commons/inputs/Select";


export default function ApproveUsers({ toast }) {
    const [users, setUsers] = useState([]);

    // Função para buscar todos os usuários
    useEffect(() => {
        UserService.get_deactivates()
            .then((response) => {
                setUsers(response);
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
                    <th>Username</th>
                    <th>Email</th>
                    <th>Ativado</th>
                    <th>Polo</th>
                    <th>Permissão</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id} className={styles.row}>
                        <td data-label="Username">{user.username}</td>
                        <td data-label="Email">{user.email}</td>
                        <td data-label="Ativado">
                            <input
                                type="checkbox"
                                checked={user.is_active}
                                onChange={(e) => toggleUserStatus(user.id, e.target.checked)}
                            />
                        </td>
                        <td data-label="Polo">{user.hub}</td>
                        <td data-label="Permissão">{user.permission}</td>
                    </tr>
                ))}
                </tbody>

            </table>
        </div>
    );
}
