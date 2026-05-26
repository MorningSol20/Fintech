package com.fintech.controller;

import com.fintech.dto.DespesaDTO;
import com.fintech.service.DespesaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/despesas")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class DespesaController {

    private final DespesaService despesaService;

    @PostMapping
    public ResponseEntity<DespesaDTO> criar(@Valid @RequestBody DespesaDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(despesaService.criar(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DespesaDTO> obterPorId(@PathVariable Long id) {
        return ResponseEntity.ok(despesaService.obterPorId(id));
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<DespesaDTO>> listarPorUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(despesaService.listarPorUsuario(usuarioId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DespesaDTO> atualizar(@PathVariable Long id, @Valid @RequestBody DespesaDTO dto) {
        return ResponseEntity.ok(despesaService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        despesaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
