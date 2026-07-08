import { Paper, type PaperProps } from "@mui/material";

//"Paper" com a propriedade "flex: 1" ativa
interface FlexPaperProps extends PaperProps { }

function FlexPaper({ children, sx, ...props }: FlexPaperProps) {
    return (
        <Paper {...props} sx={{ flex: 1, boxShadow: "none", ...sx }}>
            {children}
        </Paper>
    );
}

export default FlexPaper;