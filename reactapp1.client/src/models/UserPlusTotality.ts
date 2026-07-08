import type { User } from "./User";

//Modelo usado no endpoint "/totality" (GET).
//Usa o parentesco para herdar as variáveis da interface "User"
export interface UserPlusTotality extends User {
    total_receitas: number; //Total das Receitas da pessoa
    total_despesas: number; //Total das Despesas da pessoa
    total_saldo: number; //Saldo líquido da pessoa
}