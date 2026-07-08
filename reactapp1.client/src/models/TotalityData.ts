import type { UserPlusTotality } from "./UserPlusTotality";

//Modelo usado no endpoint "/totality" (GET)
export interface TotalityData {
    users: UserPlusTotality[]; //Lista de todas as pessoas
    total_receitas: number; //Total de receitas de todas as pessoas
    total_despesas: number; //Total de despesas de todas as pessoas
    total_saldo: number; //Saldo líquido de todas as pessoas
}