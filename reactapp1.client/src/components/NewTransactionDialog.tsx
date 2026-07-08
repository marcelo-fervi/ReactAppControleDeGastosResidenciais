import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField
} from "@mui/material";
import { useEffect, useState } from "react";
import { addTransaction } from "../api/transactions";
import { Notification } from "../services/NotificationService";
import { TransactionTypeLabel } from "../enums/TransactionTypeEnum";
import { getUsers } from "../api/users";
import type { User } from "../models/User";

//Caixa de diálogo para criar uma transação
interface NewTransactionDialogProps {
    open: boolean;
    onClose: () => void;
    onSaved: () => void;
}

export default function NewTransactionDialog({
    open,
    onClose,
    onSaved
}: NewTransactionDialogProps) {
    const [userId, setUserId] = useState(0);
    const [type, setType] = useState(0);
    const [value, setValue] = useState(0);
    const [description, setDescription] = useState("");

    const [users, setUsers] = useState<User[]>([]);

    //Preenche o input de pessoas da caixa de diálogo com a lista de pessoas mais recente possível
    useEffect(() => {
        loadUsers();
    }, []);

    async function loadUsers() {
        const data = await getUsers();
        setUsers(data);
    }

    //Função usada ao interagir com o botão de confirmar criação da transação
    async function handleSave() {
        const transaction = await addTransaction(userId, type, value, description).catch(() => { });
        if (!transaction) {
            return;
        }

        //Limpa os inputs da caixa de diálogo para que, caso o usuário venha
        //a criar outra transação, os inputs venham zerados novamente
        resetInputs();

        Notification.success("O histórico de transação foi criado com sucesso.");

        onSaved();
    }

    function resetInputs() {
        setUserId(0);
        setType(0);
        setValue(0);
        setDescription("");
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle color="textPrimary">Novo histórico de transação</DialogTitle>
            <DialogContent>
                <TextField select label="Pessoa" fullWidth margin="normal" value={userId} onChange={(e) => setUserId(Number(e.target.value))}>
                    {
                        Object.values(users).map((user) => (
                            <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
                        ))
                    }
                </TextField>
                <TextField select label="Tipo" fullWidth margin="normal" value={type} onChange={(e) => setType(Number(e.target.value))}>
                    {
                        Object.entries(TransactionTypeLabel).map(([i, label]) => (
                            <MenuItem key={i} value={i}>{label}</MenuItem>
                        ))
                    }
                </TextField>
                <TextField label="Valor" type="number" fullWidth margin="normal" value={value} onChange={(e) => setValue(Number(e.target.value))} />
                <TextField label="Descrição" fullWidth margin="normal" value={description} onChange={(e) => setDescription(e.target.value)} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button variant="contained" onClick={handleSave}>Salvar</Button>
            </DialogActions>
        </Dialog>
    );
}