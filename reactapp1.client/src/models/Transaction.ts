import type { TransactionType } from "../enums/TransactionTypeEnum";

//Modelo usado no endpoint "/transactions" (GET)
export interface Transaction {
    id: number; //Identificador único
    userId: number; //ID da pessoa a qual esta transação pertence
    userName: string; //Nome da pessoa a qual esta transação pertence
    value: number; //Valor monetário
    type: TransactionType; //Tipo da transação
    description: string; //Descrição
}