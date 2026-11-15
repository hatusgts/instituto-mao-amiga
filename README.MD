Projeto do instituto Mão Amiga

Objetivo:
automatizar parte do processo, dar mais visibilidade aos dados do que está acontecendo, e garantir um histórico confiável dos eventos realizados, doações, famílias atendida.

O repositório tem duas partes: a API (pasta api/) e o app (raiz do repositório).

Requisitos
- Java 25 (versão definida no api/pom.xml). O ./mvnw baixa o Maven sozinho
- Node.js com npm
- Para abrir no celular: Expo Go (SDK 57) e o celular na mesma rede Wi-Fi do computador

Como rodar a API
cd api
./mvnw spring-boot:run

A API sobe em http://localhost:8080 com o banco H2 gravando em arquivo (api/data). Na primeira execução ela cria alguns pontos de exemplo.
Swagger: http://localhost:8080/swagger-ui.html
Os endpoints e as prints estão em api/README.md

Como rodar o app
npm install
npx expo start

Para abrir no navegador: npx expo start --web
Para abrir no celular: ler o QR code com o Expo Go

Onde trocar o IP
O endereço da API fica em src/services/api.ts, na constante URL_API (hoje http://192.168.0.55:8080/api/v1).
Ele usa o IP do computador na rede local, e não localhost, porque no celular localhost aponta para o próprio celular.
Para descobrir o IP do computador: ip -4 addr (Linux), ifconfig (Mac) ou ipconfig (Windows). No navegador do próprio computador, localhost também funciona.
Se o IP do computador mudar, é preciso atualizar essa constante e reiniciar o app.

Roteiro de demonstração (até 3 minutos)
Antes: API e app rodando, com o app aberto na lista de pontos.

1. Buscar (0:00): digitar um bairro no campo de busca e mostrar a lista filtrando. Apagar o texto.
2. Cadastrar ponto (0:20): Cadastrar ponto, preencher os campos e salvar. O ponto novo aparece na lista.
3. Editar ponto (0:45): abrir o ponto, Editar ponto, mudar o horário e salvar. O detalhe mostra o valor novo.
4. Excluir ponto (1:00): Excluir ponto, confirmar. Ele some da lista.
5. Favoritar (1:15): tocar no ♡ de dois pontos, abrir Meus pontos e mostrar os dois. Tocar no ♥ de um deles: ele sai na hora. Fechar e abrir o app de novo: o outro continua favorito.
6. Cadastrar doação (1:45): Cadastrar doação, escolher o tipo, a quantidade e o ponto de destino. Em Ver Minhas Doações a doação nova aparece no topo.
7. Editar e excluir doação (2:10): abrir a doação, Editar doação, mudar a quantidade e salvar. Depois Excluir doação, confirmar. Ela some do histórico.
8. Erros da API (2:30): no Swagger, em POST /api/v1/doacoes, enviar quantidade 0 e mostrar o 400 (com os campos inválidos). Em GET /api/v1/doacoes/{id}, usar um id que não existe e mostrar o 404.

Decisão técnica da semana: onde ficam os dados
Os pontos e as doações ficam no servidor (API + banco). São dados compartilhados: quem abrir o app em outro aparelho precisa ver a mesma coisa, e o histórico precisa ser confiável.
Os favoritos ficam no aparelho (AsyncStorage), porque são uma preferência pessoal de quem usa aquele celular. O sistema ainda não tem login, então o servidor não teria como saber de quem é cada favorito.
No aparelho guardamos só o id de cada ponto favorito. A tela Meus pontos busca cada ponto na API pelo id, então sempre mostra o dado atual (nome ou horário mudou) e ignora o ponto que foi excluído, sem quebrar a tela.
