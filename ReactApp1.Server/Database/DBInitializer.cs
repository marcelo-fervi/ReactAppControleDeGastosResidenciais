namespace ReactApp1.Server.Database
{
    public static class DBInitializer
    {
        /// <summary>
        /// Função que faz a preparação do Banco de dados. Caso as tabelas necessárias para o sistema não existam, elas serão criadas.
        /// </summary>
        public static void Start()
        {
            using var connection = SQLServer.Create();
            using var command = connection.CreateCommand();

            command.CommandText = @"
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                age INTEGER NOT NULL
            );
            
            CREATE TABLE IF NOT EXISTS transactions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                type INTEGER NOT NULL,
                value REAL NOT NULL,
                description TEXT,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
            
            CREATE INDEX IF NOT EXISTS transactions_to_user_id
            ON transactions(user_id);
            ";

            command.ExecuteNonQuery();
        }
    }
}