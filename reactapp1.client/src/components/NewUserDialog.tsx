import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";
import { useState } from "react";
import { addUser } from "../api/users";
import { Notification } from "../services/NotificationService";

//Caixa de diálogo para criar uma pessoa
interface NewUserDialogProps {
    open: boolean;
    onClose: () => void;
    onSaved: () => void;
}

export default function NewUserDialog({
    open,
    onClose,
    onSaved
}: NewUserDialogProps) {
    const [name, setName] = useState("");
    const [age, setAge] = useState(18);

    //Função usada ao interagir com o botão de confirmar criação da pessoa
    async function handleSave() {
        const user = await addUser(name, age).catch(() => { });
        if (!user) {
            return;
        }

        //Limpa os inputs da caixa de diálogo para que, caso o usuário venha
        //cadastrar outra pessoa, os inputs venham zerados novamente
        resetInputs();

        Notification.success("Pessoa criada com sucesso.");

        onSaved();
    }

    function resetInputs() {
        setName("");
        setAge(18);
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle color="textPrimary">Nova pessoa</DialogTitle>
            <DialogContent>
                <TextField label="Nome" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
                <TextField label="Idade" type="number" fullWidth margin="normal" value={age} onChange={(e) => setAge(Number(e.target.value))} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button variant="contained" onClick={handleSave}>Salvar</Button>
            </DialogActions>
        </Dialog>
    );
}