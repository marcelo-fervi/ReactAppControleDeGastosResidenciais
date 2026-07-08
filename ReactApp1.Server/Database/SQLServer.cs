using Microsoft.Data.Sqlite;

namespace ReactApp1.Server.Database
{
    public static class SQLServer
    {
        private const string connectionString = "Data Source=database.db"; //Conexão local via arquivo, para garantir que os dados serão persistentes, sem ter que instalar um Banco de dados.

        /// <summary>
        /// Inicializa uma conexão ao servidor SQLite e a retorna para ser usada na execução de operações.
        /// AVISO: É importante lembrar de fazer o encerramento da conexão após o término das operações com o Banco de dados!
        /// </summary>
        /// <returns></returns>
        public static SqliteConnection Create()
        {
            var connection = new SqliteConnection(connectionString);
            connection.Open();

            return connection;
        }
    }
}