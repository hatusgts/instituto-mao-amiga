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
        if (repository.count() > 0) {
            return;
        }

        repository.saveAll(List.of(
                new Ponto(null, "Ponto Praça Cívica", "Praça Dr. Pedro Ludovico Teixeira", "Setor Central", "Seg a Sex, 8h às 17h", "coleta"),
                new Ponto(null, "Ponto Praça Universitária", "Praça Universitária", "Setor Leste Universitário", "Sábados, 9h às 13h", "distribuição"),
                new Ponto(null, "Ponto Vaca Brava", "Av. T-3, Parque Vaca Brava", "Setor Bueno", "Ter e Qui, 14h às 18h", "coleta"),
                new Ponto(null, "Ponto Flamboyant", "Rua 46, Parque Flamboyant", "Jardim Goiás", "Qua, 13h às 17h", "coleta"),
                new Ponto(null, "Ponto Bosque dos Buritis", "Rua 1, Bosque dos Buritis", "Setor Oeste", "Seg e Qua, 9h às 12h", "distribuição"),
                new Ponto(null, "Ponto Areião", "Av. Areião, Parque Areião", "Setor Pedro Ludovico", "Sex, 8h às 11h", "coleta"),
                new Ponto(null, "Ponto Lago das Rosas", "Av. Anhanguera, Lago das Rosas", "Setor Oeste", "Ter, 15h às 18h", "distribuição"),
                new Ponto(null, "Ponto Campus Samambaia", "Av. Esperança, Campus Samambaia", "Chácaras de Recreio Samambaia", "Sábados, 8h às 12h", "coleta")));
    }
}
