import { useEffect, useState } from "react";
import type { Transaction } from "../models/Transaction";
import { getTransactions } from "../api/transactions";
import NewTransactionDialog from "../components/NewTransactionDialog";
import { TransactionTypeLabel } from "../enums/TransactionTypeEnum";
import {
    Fab,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import { Add } from "@mui/icons-material";
import FlexPaper from "../components/FlexPaper";
import FlexStack from "../components/FlexStack";
import BoldTableCell from "../components/BoldTableCell";
import { formatCurrency } from "../utils/formatCurrency";

//Página "Transações"
export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);

    //Preenche a tabela da página atual com a lista de transações
    useEffect(() => {
        loadTransactions();
    }, []);

    async function loadTransactions() {
        const data = await getTransactions();
        setTransactions(data);
    }

    return (
        <FlexStack>
            <FlexPaper>
                <Typography variant="h4" sx={{ pb: 4 }}>Transações</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <BoldTableCell>ID</BoldTableCell>
                            <BoldTableCell>Pessoa</BoldTableCell>
                            <BoldTableCell>Tipo</BoldTableCell>
                            <BoldTableCell>Valor</BoldTableCell>
                            <BoldTableCell>Descrição</BoldTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            transactions.map(transaction => (
                                <TableRow key={transaction.id}>
                                    <TableCell>{transaction.id}</TableCell>
                                    <TableCell>{transaction.userId} ({transaction.userName})</TableCell>
                                    <TableCell>{TransactionTypeLabel[transaction.type] ?? "Desconhecido"}</TableCell>
                                    <TableCell>{formatCurrency(transaction.value)}</TableCell>
                                    <TableCell sx={ transaction.description.length === 0 ? { fontStyle: "italic", color: "gray" } : undefined }>{transaction.description || "(sem descrição)"}</TableCell>
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
            <NewTransactionDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onSaved={async () => {
                    setDialogOpen(false);

                    await loadTransactions();
                }}
            />
        </FlexStack>
    );
}