package br.com.maoamiga.api.config;

import br.com.maoamiga.api.entity.Ponto;
import br.com.maoamiga.api.repository.PontoRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CargaInicial implements CommandLineRunner {

    private final PontoRepository repository;

    @Override
    public void run(String... args) {
        List<Ponto> pontos = List.of(
                new Ponto(null, "Ponto Praça Cívica", "Praça Dr. Pedro Ludovico Teixeira", "Setor Central", "Seg a Sex, 8h às 17h", "coleta"),
                new Ponto(null, "Ponto Praça Universitária", "Praça Universitária", "Setor Leste Universitário", "Sábados, 9h às 13h", "distribuição"),
                new Ponto(null, "Ponto Vaca Brava", "Av. T-3, Parque Vaca Brava", "Setor Bueno", "Ter e Qui, 14h às 18h", "coleta"),
                new Ponto(null, "Ponto Flamboyant", "Rua 46, Parque Flamboyant", "Jardim Goiás", "Qua, 13h às 17h", "coleta"),
                new Ponto(null, "Ponto Bosque dos Buritis", "Rua 1, Bosque dos Buritis", "Setor Oeste", "Seg e Qua, 9h às 12h", "distribuição"),
                new Ponto(null, "Ponto Areião", "Av. Areião, Parque Areião", "Setor Pedro Ludovico", "Sex, 8h às 11h", "coleta"),
                new Ponto(null, "Ponto Lago das Rosas", "Av. Anhanguera, Lago das Rosas", "Setor Oeste", "Ter, 15h às 18h", "distribuição"),
                new Ponto(null, "Ponto Campus Samambaia", "Av. Esperança, Campus Samambaia", "Chácaras de Recreio Samambaia", "Sábados, 8h às 12h", "coleta"),
                new Ponto(null, "Ponto Marista", "Av. 85, 1200", "Setor Marista", "Seg a Sex, 9h às 17h", "coleta"),
                new Ponto(null, "Ponto Setor Sul", "Rua 90, 450", "Setor Sul", "Ter e Qui, 8h às 12h", "distribuição"),
                new Ponto(null, "Ponto Aeroporto", "Av. Independência, 3100", "Setor Aeroporto", "Seg a Sex, 13h às 18h", "coleta"),
                new Ponto(null, "Ponto Campinas", "Av. 24 de Outubro, 800", "Setor Campinas", "Sáb, 8h às 12h", "distribuição"),
                new Ponto(null, "Ponto Jardim América", "Av. C-4, 1500", "Jardim América", "Qua e Sex, 14h às 18h", "coleta"),
                new Ponto(null, "Ponto Coimbra", "Av. Castelo Branco, 2200", "Setor Coimbra", "Seg a Sex, 8h às 17h", "coleta"),
                new Ponto(null, "Ponto Vila Nova", "Rua 220, 310", "Setor Leste Vila Nova", "Ter, 9h às 13h", "distribuição"),
                new Ponto(null, "Ponto Novo Mundo", "Av. Nova York, 900", "Jardim Novo Mundo", "Sáb, 9h às 13h", "distribuição"),
                new Ponto(null, "Ponto Parque Amazônia", "Av. Rio Verde, 1800", "Parque Amazônia", "Seg e Qua, 14h às 17h", "coleta"),
                new Ponto(null, "Ponto Nova Suíça", "Av. T-9, 2500", "Setor Nova Suíça", "Qui, 8h às 12h", "coleta"),
                new Ponto(null, "Ponto Bueno T-63", "Av. T-63, 1100", "Setor Bueno", "Seg a Sex, 10h às 16h", "coleta"),
                new Ponto(null, "Ponto Assis Chateaubriand", "Av. Assis Chateaubriand, 400", "Setor Oeste", "Qua, 9h às 12h", "distribuição"),
                new Ponto(null, "Ponto Jardim Guanabara", "Av. Guanabara, 700", "Jardim Guanabara", "Sex, 14h às 18h", "distribuição"),
                new Ponto(null, "Ponto Faiçalville", "Av. Milão, 150", "Setor Faiçalville", "Sáb, 8h às 11h", "coleta"),
                new Ponto(null, "Ponto Criméia Leste", "Av. Bernardo Sayão, 1300", "Setor Criméia Leste", "Ter e Qui, 13h às 17h", "coleta"),
                new Ponto(null, "Ponto Norte Ferroviário", "Av. Goiás Norte, 2000", "Setor Norte Ferroviário", "Seg a Sex, 7h às 11h", "distribuição"),
                new Ponto(null, "Ponto Jardim Europa", "Av. Europa, 600", "Jardim Europa", "Qua e Sáb, 9h às 12h", "coleta"));

        for (Ponto ponto : pontos) {
            if (!repository.existsByNome(ponto.getNome())) {
                repository.save(ponto);
            }
        }
    }
}
