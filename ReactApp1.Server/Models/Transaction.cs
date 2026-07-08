using ReactApp1.Server.Enums;

namespace ReactApp1.Server.Models
{
    //Classe que representa uma Transação
    public class Transaction
    {
        public int id { get; set; } //Identificador único
        public int userId { get; set; } //ID da pessoa ao qual esta transação pertence
        public string userName { get; set; } = ""; //Nome da pessoa ao qual esta transação pertence
        public double value { get; set; } //Valor monetário
        public TransactionTypeEnum type { get; set; } //Tipo da transação
        public string? description { get; set; } //Descrição
    }
}