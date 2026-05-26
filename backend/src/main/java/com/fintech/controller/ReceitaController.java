package com.fintech.controller;

import com.fintech.dto.ReceitaDTO;
import com.fintech.service.ReceitaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/receitas")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ReceitaController {

    private final ReceitaService receitaService;

    @PostMapping
    public ResponseEntity<ReceitaDTO> criar(@Valid @RequestBody ReceitaDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(receitaService.criar(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReceitaDTO> obterPorId(@PathVariable Long id) {
        return ResponseEntity.ok(receitaService.obterPorId(id));
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<ReceitaDTO>> listarPorUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(receitaService.listarPorUsuario(usuarioId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReceitaDTO> atualizar(@PathVariable Long id, @Valid @RequestBody ReceitaDTO dto) {
        return ResponseEntity.ok(receitaService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        receitaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
