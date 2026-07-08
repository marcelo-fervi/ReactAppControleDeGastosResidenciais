using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Database;
using ReactApp1.Server.Enums;
using ReactApp1.Server.Models;

namespace ReactApp1.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TotalityController : ControllerBase
    {
        private readonly ILogger<TotalityController> _logger;

        public TotalityController(ILogger<TotalityController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Retornará um objeto com as informações de todas as pessoas cadastradas, incluindo o total de receita, despesas e saldo delas.
        /// Além disso, também fará o cálculo do total de receitas, despesas e saldo de todas essas pessoas, e retornará essas informações dentro do objeto.
        /// </summary>
        /// <returns></returns>
        [HttpGet(Name = "GetTotality")]
        public TotalityData GetTotality()
        {
            var result = new TotalityData();
            List<UserPlusTotality> users = [];

            using var connection = SQLServer.Create();
            using var command = connection.CreateCommand();

            command.CommandText = """
                SELECT
                    u.id,
                    u.name,
                    u.age,
                    COALESCE(SUM(CASE WHEN t.type = @receitatype THEN t.value END), 0.0) AS total_revenue,
                    COALESCE(SUM(CASE WHEN t.type = @despesatype THEN t.value END), 0.0) AS total_cost
                FROM users u
                LEFT JOIN transactions t
                ON u.id = t.user_id
                GROUP BY u.id
                ORDER BY u.id DESC;
            """;

            command.Parameters.AddWithValue("@receitatype", TransactionTypeEnum.Receita);
            command.Parameters.AddWithValue("@despesatype", TransactionTypeEnum.Despesa);

            using var reader = command.ExecuteReader();
            while (reader.Read())
            {
                var newUser = new UserPlusTotality()
                {
                    id = (int)(long)reader["id"],
                    name = (string)reader["name"],
                    age = (int)(long)reader["age"],
                    total_receitas = (double)reader["total_revenue"],
                    total_despesas = (double)reader["total_cost"]
                };

                users.Add(newUser);

                //Vamos aproveitar a leitura dos dados da pessoa para preencher os dados de totalidade de todas as pessoas
                result.total_receitas += newUser.total_receitas;
                result.total_despesas += newUser.total_despesas;
            }

            result.users = users;

            return result;
        }
    }
}