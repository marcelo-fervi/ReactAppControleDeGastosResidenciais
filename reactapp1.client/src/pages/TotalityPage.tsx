import { useEffect, useState } from "react";
import { getTotalityData } from "../api/totality";
import type { TotalityData } from "../models/TotalityData";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import FlexStack from "../components/FlexStack";
import FlexPaper from "../components/FlexPaper";
import BoldTableCell from "../components/BoldTableCell";
import { formatCurrency } from "../utils/formatCurrency";

//Página "Totalidade das Pessoas"
export default function TotalityPage() {
    const [totality, setTotality] = useState<TotalityData>({
        total_despesas: 0,
        total_receitas: 0,
        total_saldo: 0,
        users: []
    });

    //Preenche a tabela da página atual com os dados de totalidade
    useEffect(() => {
        loadTotalityData();
    }, []);

    async function loadTotalityData() {
        const data = await getTotalityData();
        setTotality(data);
    }

    return (
        <FlexStack>
            <FlexPaper>
                <Typography variant="h4" sx={{ pb: 4 }}>Totalidade das Pessoas</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <BoldTableCell>ID</BoldTableCell>
                            <BoldTableCell>Nome</BoldTableCell>
                            <BoldTableCell>Idade</BoldTableCell>
                            <BoldTableCell>Total de Receitas</BoldTableCell>
                            <BoldTableCell>Total de Despesas</BoldTableCell>
                            <BoldTableCell>Saldo líquido</BoldTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            totality.users.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.age} anos</TableCell>
                                    <TableCell>{formatCurrency(user.total_receitas)}</TableCell>
                                    <TableCell>{formatCurrency(user.total_despesas)}</TableCell>
                                    <TableCell>{formatCurrency(user.total_saldo)}</TableCell>
                                </TableRow>
                            ))
                        }
                        <TableRow>
                            <BoldTableCell>Total:</BoldTableCell>
                            <TableCell>-</TableCell>
                            <TableCell>-</TableCell>
                            <TableCell>{formatCurrency(totality.total_receitas)}</TableCell>
                            <TableCell>{formatCurrency(totality.total_despesas)}</TableCell>
                            <TableCell>{formatCurrency(totality.total_saldo)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </FlexPaper>
        </FlexStack>
    );
}