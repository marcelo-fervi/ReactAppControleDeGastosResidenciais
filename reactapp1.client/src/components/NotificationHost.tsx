import { Alert, Snackbar } from "@mui/material";
import type { AlertColor } from "@mui/material";
import { useEffect, useState } from "react";
import { Notification } from "../services/NotificationService";

//Componente pra poder renderizar Snackbars (notificações) mais facilmente
export default function NotificationHost() {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState<AlertColor>("info");

    useEffect(() => {
        Notification.register((msg, severity) => {
            setMessage(msg);
            setSeverity(severity);
            setOpen(true);
        });

        return () => Notification.unregister();
    }, []);

    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={() => setOpen(false)}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
        >
            <Alert severity={severity} variant="filled" onClose={() => setOpen(false)}>{message}</Alert>
        </Snackbar>
    );
}