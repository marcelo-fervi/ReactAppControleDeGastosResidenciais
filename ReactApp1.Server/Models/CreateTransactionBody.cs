using ReactApp1.Server.Enums;

namespace ReactApp1.Server.Models
{
    //Classe usada na leitura do body do endpoint "/Transactions" (POST).
    public class CreateTransactionBody
    {
        public int userId { get; set; } //Pessoa ao qual a transação será atribuída
        public TransactionTypeEnum type { get; set; } //Tipo da transação
        public double value { get; set; } //Valor monetário
        public string description { get; set; } = ""; //Descrição
    }
}