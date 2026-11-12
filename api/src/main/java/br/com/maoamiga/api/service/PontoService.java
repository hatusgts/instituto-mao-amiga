package br.com.maoamiga.api.service;

import br.com.maoamiga.api.dto.PontoRequestDTO;
import br.com.maoamiga.api.dto.PontoResponseDTO;
import br.com.maoamiga.api.entity.Ponto;
import br.com.maoamiga.api.repository.PontoRepository;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class PontoService {

    private final PontoRepository repository;

    public List<PontoResponseDTO> listar() {
        return repository.findAll().stream().map(PontoResponseDTO::from).toList();
    }

    public PontoResponseDTO buscar(UUID id) {
        return PontoResponseDTO.from(buscarEntidade(id));
    }

    public PontoResponseDTO criar(PontoRequestDTO dto) {
        Ponto ponto = new Ponto();
        copiar(dto, ponto);
        return PontoResponseDTO.from(repository.save(ponto));
    }

    public PontoResponseDTO atualizar(UUID id, PontoRequestDTO dto) {
        Ponto ponto = buscarEntidade(id);
        copiar(dto, ponto);
        return PontoResponseDTO.from(repository.save(ponto));
    }

    public void excluir(UUID id) {
        repository.delete(buscarEntidade(id));
    }

    private Ponto buscarEntidade(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ponto não encontrado"));
    }

    private void copiar(PontoRequestDTO dto, Ponto ponto) {
        ponto.setNome(dto.nome());
        ponto.setEndereco(dto.endereco());
        ponto.setBairro(dto.bairro());
        ponto.setHorario(dto.horario());
        ponto.setTipo(dto.tipo());
    }
}
