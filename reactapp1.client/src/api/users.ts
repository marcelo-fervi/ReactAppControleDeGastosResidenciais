import type { User } from "../models/User.tsx";
import { Notification } from "../services/NotificationService";
import { getAPIEndpoint } from "./base.ts";

//Busca TODAS as pessoas registradas atualmente no Banco de dados do sistema
export async function getUsers(): Promise<User[]> {
    const response = await fetch(getAPIEndpoint("users"));
    if (!response.ok) {
        Notification.error(await response.text());

        throw new Error("Erro ao consultar a lista de pessoas.");
    }

    return await response.json();
}

//Tenta remover uma pessoa e as transações atribuídas a ela.
//Retornará um boolean representando o sucesso ou falha da operação
export async function deleteUser(id: number): Promise<boolean> {
    const response = await fetch(getAPIEndpoint(`users?id=${id}`), {
        method: "DELETE"
    });

    if (!response.ok) {
        Notification.error(await response.text());

        throw new Error("Erro ao excluir uma pessoa.");
    }

    return response.ok;
}

//Tenta adicionar uma nova pessoa no Banco de dados do sistema.
//Caso ocorra um erro, será devolvido "undefined"
export async function addUser(name: string, age: number): Promise<User | undefined> {
    const response = await fetch(getAPIEndpoint("users"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            age
        })
    });

    if (!response.ok) {
        Notification.error(await response.text());

        throw new Error("Erro ao adicionar uma pessoa.");
    }

    return await response.json();
}