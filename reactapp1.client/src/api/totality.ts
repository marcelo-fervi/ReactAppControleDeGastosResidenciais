import type { TotalityData } from "../models/TotalityData.tsx";
import { Notification } from "../services/NotificationService";
import { getAPIEndpoint } from "./base.ts";

export async function getTotalityData(): Promise<TotalityData> {
    const response = await fetch(getAPIEndpoint("totality"));
    if (!response.ok) {
        Notification.error(await response.text());

        throw new Error("Erro ao consultar as totalidades do sistema.");
    }

    return await response.json();
}