package br.com.maoamiga.api.service;

import br.com.maoamiga.api.dto.DoacaoRequestDTO;
import br.com.maoamiga.api.dto.DoacaoResponseDTO;
import br.com.maoamiga.api.entity.Doacao;
import br.com.maoamiga.api.repository.DoacaoRepository;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class DoacaoService {

    private final DoacaoRepository repository;

    public Page<DoacaoResponseDTO> filtrar(String filtro, Pageable pageable) {
        return repository.findByTipoItemContainingIgnoreCase(filtro.trim(), pageable).map(DoacaoResponseDTO::from);
    }

    public DoacaoResponseDTO buscar(UUID id) {
        return DoacaoResponseDTO.from(buscarEntidade(id));
    }

    public DoacaoResponseDTO criar(DoacaoRequestDTO dto) {
        Doacao doacao = new Doacao();
        copiar(dto, doacao);
        doacao.setCriadoEm(LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS));
        return DoacaoResponseDTO.from(repository.save(doacao));
    }

    public DoacaoResponseDTO atualizar(UUID id, DoacaoRequestDTO dto) {
        Doacao doacao = buscarEntidade(id);
        copiar(dto, doacao);
        return DoacaoResponseDTO.from(repository.save(doacao));
    }

    public void excluir(UUID id) {
        repository.delete(buscarEntidade(id));
    }

    private Doacao buscarEntidade(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Doação não encontrada"));
    }

    private void copiar(DoacaoRequestDTO dto, Doacao doacao) {
        doacao.setTipoItem(dto.tipoItem());
        doacao.setQuantidade(dto.quantidade());
        doacao.setPontoDestino(dto.pontoDestino());
    }
}
