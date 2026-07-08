using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Database;
using ReactApp1.Server.Enums;
using ReactApp1.Server.Models;

namespace ReactApp1.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly ILogger<TransactionsController> _logger;

        public TransactionsController(ILogger<TransactionsController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Retorna a lista de todas as transações cadastradas no Banco de dados
        /// </summary>
        /// <returns></returns>
        [HttpGet(Name = "GetTransactions")]
        public IEnumerable<Transaction> GetTransactions()
        {
            List<Transaction> transactions = [];

            using var connection = SQLServer.Create();
            using var command = connection.CreateCommand();
            command.CommandText = """
                SELECT
                    t.id,
                    t.user_id,
                    u.name AS user_name,
                    t.type,
                    t.value,
                    t.description
                FROM transactions t
                LEFT JOIN users u
                ON u.id = t.user_id
                ORDER BY t.id DESC;
            """;

            using var reader = command.ExecuteReader();
            while (reader.Read())
            {
                transactions.Add(new Transaction()
                {
                    id = (int)(long)reader["id"],
                    userId = (int)(long)reader["user_id"],
                    userName = (string)reader["user_name"],
                    type = (TransactionTypeEnum)(long)reader["type"],
                    value = (double)reader["value"],
                    description = (string)reader["description"],
                });
            }

            return transactions;
        }

        /// <summary>
        /// Permite inserir uma transação no Banco de dados.
        /// Será feita a sanitização dos dados do body antes de efetivar os dados no Banco de dados.
        /// Caso um erro ocorra, retornaremos um texto com a razão do erro.
        /// </summary>
        /// <param name="body">Body da requisição</param>
        /// <returns></returns>
        [HttpPost(Name = "CreateTransaction")]
        public ActionResult<Transaction?> CreateTransaction([FromBody] CreateTransactionBody body)
        {
            body.description = body.description.Trim(); //Remove espaços no começo e fim da descrição

            var user = UsersController.GetUserById(body.userId);
            if (user == null)
            {
                return BadRequest("A pessoa não é uma pessoa válida.");
            }
            else if (body.type < 0 || body.type > TransactionTypeEnum.Max)
            {
                return BadRequest("O tipo da transação não é válido.");
            }
            else if (body.value < 0)
            {
                return BadRequest("Somente valores de transação positivos são aceitos.");
            }
            else if (user.IsUnderage && body.type != TransactionTypeEnum.Despesa)
            {
                return BadRequest("Transações que não sejam de despesa não podem ser registradas para pessoas menores de idade (menores de 18 anos)");
            }

            using var connection = SQLServer.Create();
            using var command = connection.CreateCommand();

            command.CommandText = """
                INSERT INTO transactions (user_id, type, value, description) VALUES (@userid, @type, @value, @desc);
                SELECT last_insert_rowid();
            """;
                
            command.Parameters.AddWithValue("@userid", body.userId);
            command.Parameters.AddWithValue("@type", (int)body.type);
            command.Parameters.AddWithValue("@value", body.value);
            command.Parameters.AddWithValue("@desc", body.description);
            
            long? id = (long?)command.ExecuteScalar();
            if (id == null)
            {
                return StatusCode(500, "Erro desconhecido ao adicionar a transação.");
            }

            return new Transaction()
            {
                id = (int)id,
                userId = body.userId,
                userName = user.name,
                type = body.type,
                value = body.value,
                description = body.description
            };
        }
    }
}