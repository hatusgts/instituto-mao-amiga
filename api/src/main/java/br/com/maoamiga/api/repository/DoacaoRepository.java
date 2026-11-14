package br.com.maoamiga.api.repository;

import br.com.maoamiga.api.entity.Doacao;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoacaoRepository extends JpaRepository<Doacao, UUID> {

    Page<Doacao> findByTipoItemContainingIgnoreCase(String tipoItem, Pageable pageable);
}
