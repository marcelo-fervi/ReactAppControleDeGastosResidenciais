//Retorna um número monetário já formatado para ser representado usando o padrão de reais R$
export function formatCurrency(value: number): string {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);
}