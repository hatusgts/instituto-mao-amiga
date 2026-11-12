API Instituto Mão Amiga

API do Instituto Mão Amiga com o CRUD dos pontos de coleta e distribuição.
Feita com Spring Boot, Spring Data JPA, H2 (gravando em arquivo, na pasta data/), Lombok, Bean Validation e Swagger (springdoc-openapi).

Para rodar: ./mvnw spring-boot:run
A API sobe na porta 8080. Na primeira vez são cadastrados 8 pontos em Goiânia.

Swagger: http://localhost:8080/swagger-ui/index.html
Console do H2: http://localhost:8080/h2-console (JDBC URL jdbc:h2:file:./data/maoamiga, usuário sa, sem senha)


Endpoints

GET http://localhost:8080/api/v1/pontos
Lista todos os pontos. Responde 200.
![GET lista](docs/prints/01-get-lista.png)

GET http://localhost:8080/api/v1/pontos/{id}
Busca um ponto pelo id. Responde 200, ou 404 se o id não existir.
![GET por id](docs/prints/02-get-por-id.png)
![GET por id inexistente - 404](docs/prints/03-get-404.png)

POST http://localhost:8080/api/v1/pontos
Cadastra um ponto. Responde 201, ou 400 se algum campo obrigatório estiver vazio (e nada é gravado).
![POST](docs/prints/04-post.png)
![POST com campo vazio - 400](docs/prints/05-post-400.png)

PUT http://localhost:8080/api/v1/pontos/{id}
Edita um ponto. Responde 200, 404 se o id não existir, ou 400 se algum campo obrigatório estiver vazio.
![PUT](docs/prints/06-put.png)
![PUT com id inexistente - 404](docs/prints/07-put-404.png)

DELETE http://localhost:8080/api/v1/pontos/{id}
Exclui um ponto. Responde 204, ou 404 se o id não existir.
![DELETE](docs/prints/08-delete.png)


Exemplo de corpo para POST e PUT

{
  "nome": "Ponto Setor Marista",
  "endereco": "Rua 10, 250",
  "bairro": "Setor Marista",
  "horario": "Seg a Sex, 8h às 17h",
  "tipo": "coleta"
}

Todos os campos são obrigatórios. O tipo deve ser "coleta" ou "distribuição".
