namespace ReactApp1.Server.Models
{
    //Classe que representa os dados de totalidade do endpoint "/Totality" (GET).
    public class TotalityData
    {
        public double total_receitas { get; set; }
        public double total_despesas { get; set; }
        public double total_saldo => total_receitas - total_despesas;
        public IEnumerable<UserPlusTotality> users { get; set; } = [];
    }
}