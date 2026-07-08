namespace ReactApp1.Server.Models
{
    //Classe que herda "User" para incrementar os dados de uma Pessoa após cálculos de totalidade
    public class UserPlusTotality : User
    {
        public double total_receitas { get; set; }
        public double total_despesas { get; set; }

        public double total_saldo => total_receitas - total_despesas;
    }
}