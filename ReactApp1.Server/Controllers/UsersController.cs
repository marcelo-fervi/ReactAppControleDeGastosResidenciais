using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Database;
using ReactApp1.Server.Models;

namespace ReactApp1.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;

        public UsersController(ILogger<UsersController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Retorna a lista de todas as pessoas cadastradas no Banco de dados
        /// </summary>
        /// <returns></returns>
        [HttpGet(Name = "GetUsers")]
        public IEnumerable<User> GetUsers()
        {
            List<User> users = [];

            using var connection = SQLServer.Create();
            using var command = connection.CreateCommand();
            command.CommandText = """
                SELECT
                    id,name,age
                FROM users
                ORDER BY id DESC;
            """;

            using var reader = command.ExecuteReader();
            while (reader.Read())
            {
                users.Add(new User()
                {
                    id   = (int)(long)reader["id"],
                    name = (string)reader["name"],
                    age  = (int)(long)reader["age"]
                });
            }

            return users;
        }

        /// <summary>
        /// Permite inserir uma pessoa no Banco de dados.
        /// Será feita a sanitização dos dados do body antes de efetivar os dados no Banco de dados.
        /// Caso um erro ocorra, retornaremos um texto com a razão do erro.
        /// </summary>
        /// <param name="body">Body da requisição</param>
        /// <returns></returns>
        [HttpPost(Name = "CreateUser")]
        public ActionResult<User?> CreateUser([FromBody] CreateUserBody body)
        {
            body.name = body.name.Trim(); //Remove espaços no começo e fim do nome

            if (body.name.Length == 0)
            {
                return BadRequest("Nome vazio ou inválido.");
            }
            else if (body.age < 0)
            {
                return BadRequest("Idade não pode ser menor do que zero.");
            }

            using var connection = SQLServer.Create();
            using var command = connection.CreateCommand();

            command.CommandText = """
                INSERT INTO users (name, age) VALUES (@name, @age);
                SELECT last_insert_rowid();
            """;

            command.Parameters.AddWithValue("@name", body.name);
            command.Parameters.AddWithValue("@age", body.age);

            long? id = (long?)command.ExecuteScalar();
            if (id == null)
            {
                return StatusCode(500, "Erro desconhecido ao adicionar a pessoa.");
            }

            return new User()
            {
                id = (int)id,
                name = body.name,
                age = body.age
            };
        }

        /// <summary>
        /// Endpoint para deletar uma pessoa.
        /// Todas as transações da pessoa também serão deletadas quando ela for deletada, devido a relação de chave estrangeira com remoção em cascata.
        /// </summary>
        /// <returns></returns>
        [HttpDelete(Name = "DeleteUser")]
        public bool DeleteUser([FromQuery] int id)
        {
            using var connection = SQLServer.Create();
            using var command = connection.CreateCommand();
            command.Parameters.AddWithValue("@userid", id);

            command.CommandText = "DELETE FROM users WHERE id=@userid;";
            return command.ExecuteNonQuery() > 0;
        }

        //Abaixo somente haverão funções, e não endpoints alcançáveis.

        /// <summary>
        /// Busca os dados de uma pessoa no Banco de dados através do seu identificador único.
        /// </summary>
        /// <param name="id">Identificador</param>
        /// <returns></returns>
        public static User? GetUserById(int id)
        {
            User? user = null;

            using var connection = SQLServer.Create();
            using var command = connection.CreateCommand();
            command.CommandText = "SELECT name,age FROM users WHERE id=@id;";
            command.Parameters.AddWithValue("@id", id);

            using var reader = command.ExecuteReader();
            while (reader.Read())
            {
                user = new User()
                {
                    id = id,
                    name = (string)reader["name"],
                    age = (int)(long)reader["age"]
                };
            }

            return user;
        }
    }
}