Projeto do instituto Mão amiga

Objetivo:
automatizar parte do processo, dar mais visibilidade aos dados do que está acontecendo, e garantir um histórico confiável dos eventos realizados, doações, famílias atendida.

Primeira sprint, será para a visualização dos pontos de coleta e distribuição

API dos pontos de coleta:
fica na pasta api/ deste repositório (Spring Boot, Spring Data JPA e banco H2 gravando em arquivo).
Para rodar: entrar na pasta api e executar ./mvnw spring-boot:run
A API sobe na porta 8080. Os endpoints e as prints do Swagger estão em api/README.md
O endereço usado pelo app fica em src/services/api.ts

Como o app acessa a API:
o endereço usa o IP do computador na rede local (http://192.168.0.55:8080), e não localhost, porque no celular localhost aponta para o próprio celular.
O teste foi feito no navegador, com npx expo start --web. Para testar no celular, ele precisa estar na mesma rede Wi-Fi do computador.
