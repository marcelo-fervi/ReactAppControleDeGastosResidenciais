const API = "http://localhost:5290/"; //Endereço base da API do Backend
//Para o protocolo HTTPS, utilize a porta 7286

//Função para construir facilmente os endpoints que serão consumidos pelo frontend,
//sem se preocupar com o endereço base (que é constante)
//e sem se preocupar com a distribuição das barras
export function getAPIEndpoint(path: string): string {
    return new URL(path, API).toString();
}