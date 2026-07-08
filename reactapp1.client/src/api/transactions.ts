import type { Transaction } from "../models/Transaction.tsx";
import { Notification } from "../services/NotificationService";
import { getAPIEndpoint } from "./base.ts";

//Busca TODAS as transações registradas atualmente no Banco de dados do sistema
export async function getTransactions(): Promise<Transaction[]> {
    const response = await fetch(getAPIEndpoint("transactions"));
    if (!response.ok) {
        Notification.error(await response.text());

        throw new Error("Erro ao consultar todas as transações do sistema.");
    }

    return await response.json();
}

//Tenta adicionar uma nova transação no Banco de dados do sistema.
//Caso ocorra um erro, será devolvido "undefined"
export async function addTransaction(userId: number, type: number, value: number, description: string): Promise<Transaction | undefined> {
    const response = await fetch(getAPIEndpoint("transactions"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId,
            type,
            value,
            description
        })
    });

    if (!response.ok) {
        Notification.error(await response.text());

        throw new Error("Erro ao adicionar transação.");
    }

    return await response.json();
}