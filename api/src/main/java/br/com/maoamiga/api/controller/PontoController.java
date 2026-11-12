package br.com.maoamiga.api.controller;

import br.com.maoamiga.api.dto.PontoRequestDTO;
import br.com.maoamiga.api.dto.PontoResponseDTO;
import br.com.maoamiga.api.service.PontoService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/pontos")
@CrossOrigin
@RequiredArgsConstructor
public class PontoController {

    private final PontoService service;

    @GetMapping
    public List<PontoResponseDTO> listar() {
        return service.listar();
    }

    @GetMapping("/filtro")
    public Page<PontoResponseDTO> filtrar(
            @RequestParam(defaultValue = "") String filtro,
            @PageableDefault(size = 10, sort = "nome") Pageable pageable) {
        return service.filtrar(filtro, pageable);
    }

    @GetMapping("/{id}")
    public PontoResponseDTO buscar(@PathVariable UUID id) {
        return service.buscar(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PontoResponseDTO criar(@Valid @RequestBody PontoRequestDTO dto) {
        return service.criar(dto);
    }

    @PutMapping("/{id}")
    public PontoResponseDTO atualizar(@PathVariable UUID id, @Valid @RequestBody PontoRequestDTO dto) {
        return service.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable UUID id) {
        service.excluir(id);
    }
}
