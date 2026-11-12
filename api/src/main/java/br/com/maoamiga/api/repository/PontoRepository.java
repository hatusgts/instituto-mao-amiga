package br.com.maoamiga.api.repository;

import br.com.maoamiga.api.entity.Ponto;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PontoRepository extends JpaRepository<Ponto, UUID> {

    boolean existsByNome(String nome);

    @Query("SELECT p FROM Ponto p WHERE LOWER(p.nome) LIKE LOWER(CONCAT('%', :filtro, '%'))"
            + " OR LOWER(p.bairro) LIKE LOWER(CONCAT('%', :filtro, '%'))")
    Page<Ponto> buscar(@Param("filtro") String filtro, Pageable pageable);
}
