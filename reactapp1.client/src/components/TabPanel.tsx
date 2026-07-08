import { Stack } from "@mui/material";

//"TabPanel" permite renderizar somente a página que tiver sido selecionada pelo usuário
interface TabPanelProps {
    value: string;
    name: string;
    children: React.ReactNode;
}

export default function TabPanel({ value, name, children }: TabPanelProps) {
    const isEnabled = (value === name);
    return (
        <Stack sx={{ display: (isEnabled ? "flex" : "none"), flex: 1 }}>
            {isEnabled && children}
        </Stack>
    );
}