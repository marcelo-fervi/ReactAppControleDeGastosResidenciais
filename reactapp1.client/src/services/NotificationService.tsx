import type { AlertColor } from "@mui/material";

type NotificationHandler = (
    message: string,
    severity: AlertColor
) => void;

class NotificationService {
    private handler?: NotificationHandler;

    register(handler: NotificationHandler) {
        this.handler = handler;
    }

    unregister() {
        this.handler = undefined;
    }

    show(message: string, severity: AlertColor = "info") {
        this.handler?.(message, severity);
    }

    success(message: string) {
        this.show(message, "success");
    }

    error(message: string) {
        this.show(message, "error");
    }

    warning(message: string) {
        this.show(message, "warning");
    }

    info(message: string) {
        this.show(message, "info");
    }
}

//É o serviço responsáveis por disparar notificações usando os Snackbars
export const Notification = new NotificationService();