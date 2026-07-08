import { useEffect, useState } from "react";
import type { User } from "../models/User";
import { getUsers, deleteUser } from "../api/users";
import NewUserDialog from "../components/NewUserDialog";
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Fab
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Notification } from "../services/NotificationService";
import { Add } from "@mui/icons-material";
import FlexPaper from "../components/FlexPaper";
import FlexStack from "../components/FlexStack";
import BoldTableCell from "../components/BoldTableCell";

//Página "Pessoas"
export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);

    //Preenche a tabela da página atual com a lista de pessoas
    useEffect(() => {
        loadUsers();
    }, []);

    async function loadUsers() {
        const data = await getUsers();
        setUsers(data);
    }

    //Função usada ao interagir com o botão de deletar pessoa
    async function onDelete(id: number) {
        if (!confirm("Você tem certeza que deseja excluir esta pessoa?")) {
            return;
        }

        const result = await deleteUser(id);
        if (!result) {
            return;
        }

        Notification.success("Pessoa excluída com sucesso.");

        await loadUsers();
    }

    return (
        <FlexStack>
            <FlexPaper>
                <Typography variant="h4" sx={{ pb: 4 }}>Pessoas</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <BoldTableCell>ID</BoldTableCell>
                            <BoldTableCell>Nome</BoldTableCell>
                            <BoldTableCell>Idade</BoldTableCell>
                            <BoldTableCell>Ações</BoldTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            users.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.age} anos</TableCell>

                                    <TableCell>
                                        <IconButton color="error" onClick={() => onDelete(user.id)}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>

                <Fab color="primary" aria-label="add" sx={{
                    position: "fixed",
                    bottom: 96,
                    right: 24,
                }} onClick={() => setDialogOpen(true)}>
                    <Add></Add>
                </Fab>
            </FlexPaper>
            <NewUserDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onSaved={async () => {
                    setDialogOpen(false);

                    await loadUsers();
                }}
            />
        </FlexStack>
    );
}