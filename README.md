# Sistema de Controle de Gastos residenciais
É um sistema bem simples que construí, com o objetivo de simular um pequeno sistema de Controle de Gastos residenciais, permitindo o usuário registrar pessoas e transações, remover pessoas, e consultar relatórios da totalidade de todas as pessoas cadastradas no sistema.

## Aspectos técnicos:
- Fiz uso de **React + TypeScript** no front-end, e **.NET** no backend.
- O frontend utiliza **Material UI** para um visual mais agradável e coeso.
- Os dados do sistema são mantidos localmente utilizando **SQLite**.
- Foi utilizado o **Visual Studio 2022** para criar a base do projeto.

### Ele possui três páginas principais:
- Pessoas: Para gerenciamento, cadastro e remoção de Pessoas;
- Transações: Para gerenciar e cadastrar transações que são atreladas a uma pessoa;
- Totalidade das Pessoas: Permite analisar os dados da totalidade das pessoas cadastradas no sistema *(Totalidade de Receitas, Despesas e Saldo líquido)*.

### Como inicializar:
- **Visual Studio**: Utilize o perfil "http" e inicie o build do projeto.
- **VS Code**: Vá para a pasta "ReactApp1.Server" e rode o comando `dotnet run --launch-profile "http"` para inicializar o projeto utilizando somente o protocolo HTTP. Em caso de interesse pelo protocolo HTTPS, use `dotnet run --launch-profile "https"` *(OBS.: Será necessário atualizar o endpoint apontado pelo frontend para **7286** em "/src/api/base.ts")*.
