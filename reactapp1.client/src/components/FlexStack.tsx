import { Stack, type StackProps } from "@mui/material";

//"Stack" preparado para ser o parente de tags que sejam do tipo flex e que esperam a organização por colunas.
//Vai ser principalmente usado no design de cada página para acomodar melhor as tabelas
interface FlexStackProps extends StackProps { }

function FlexStack({ children, sx, ...props }: FlexStackProps) {
    return (
        <Stack {...props} sx={{ px: 6, py: 3, display: "flex", flex: 1, flexDirection: "column", ...sx }}>
            {children}
        </Stack>
    );
}

export default FlexStack;