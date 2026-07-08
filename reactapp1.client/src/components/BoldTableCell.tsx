import { TableCell, type TableCellProps } from "@mui/material";

//Componente pra simplificar a criação de células que já venham com texto em negrito, evitando que tenha que escrever "fontWeight: "bold" sempre
interface BoldTableCellProps extends TableCellProps { }

function BoldTableCell({ children, sx, ...props }: BoldTableCellProps) {
    return (
        <TableCell {...props} sx={{ fontWeight: "bold", ...sx }}>
            {children}
        </TableCell>
    );
}

export default BoldTableCell;