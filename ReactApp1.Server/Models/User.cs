namespace ReactApp1.Server.Models
{
    //Classe que representa uma Pessoa
    public class User
    {
        public int id { get; set; } //Identificador único
        public int age { get; set; } //Idade
        public string name { get; set; } = ""; //Nome

        public bool IsUnderage => age < 18; //Booleano para checar rapidamente se a pessoa é menor de idade
    }
}