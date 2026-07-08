import { useState } from 'react';
import './App.css';
import TotalityPage from './pages/TotalityPage';
import TransactionsPage from './pages/TransactionsPage';
import UsersPage from "./pages/UsersPage";
import { Stack, Tab, Tabs } from '@mui/material';
import { AccountCircle, Receipt, Summarize } from '@mui/icons-material';
import TabPanel from './components/TabPanel';
import NotificationHost from './components/NotificationHost';

function App() {
    const [tab, setTab] = useState("users"); //Define a página inicial como "users"
    
    return (
        <Stack sx={{ bgcolor: "#ffffff", flex: "1" }}>
            <TabPanel value={tab} name="users">
                <UsersPage></UsersPage>
            </TabPanel>
            <TabPanel value={tab} name="transactions">
                <TransactionsPage></TransactionsPage>
            </TabPanel>
            <TabPanel value={tab} name="totality">
                <TotalityPage></TotalityPage>
            </TabPanel>
            <Tabs sx={{ bgcolor: "#f0f0f0" }} variant="fullWidth" value={tab} onChange={(_, newValue) => setTab(newValue)}>
                <Tab label="Pessoas" value="users" icon={<AccountCircle />} iconPosition="top" sx={{ fontWeight: "bold" }} />
                <Tab label="Transações" value="transactions" icon={<Receipt />} iconPosition="top" sx={{ fontWeight: "bold" }} />
                <Tab label="Relatórios" value="totality" icon={<Summarize />} iconPosition="top" sx={{ fontWeight: "bold" }} />
            </Tabs>
            <NotificationHost />
        </Stack>
    )
}

export default App