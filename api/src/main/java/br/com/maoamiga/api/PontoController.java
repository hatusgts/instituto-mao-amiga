package br.com.maoamiga.api;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/pontos")
public class PontoController {

    private final PontoRepository repository;

    public PontoController(PontoRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public Page<PontoResponse> listar(Pageable pageable) {
        return repository.findAll(pageable).map(PontoResponse::from);
    }

    @GetMapping("/{id}")
    public PontoResponse buscar(@PathVariable Long id) {
        return repository.findById(id)
                .map(PontoResponse::from)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ponto não encontrado"));
    }
}
