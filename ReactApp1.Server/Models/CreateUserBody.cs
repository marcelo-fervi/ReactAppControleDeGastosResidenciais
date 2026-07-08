namespace ReactApp1.Server.Models
{
    //Classe usada na leitura do body do endpoint "/Users" (POST).
    public class CreateUserBody
    {
        public string name { get; set; } = ""; //Nome da pessoa
        public int age { get; set; } //Idade da pessoa
    }
}