export const TransactionType = {
    Receita: 0,
    Despesa: 1
};

export type TransactionType = typeof TransactionType[keyof typeof TransactionType];

export const TransactionTypeLabel: Record<TransactionType, string> = {
    [TransactionType.Receita]: "Receita",
    [TransactionType.Despesa]: "Despesa",
};