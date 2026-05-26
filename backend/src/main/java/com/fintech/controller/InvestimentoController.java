package com.fintech.controller;

import com.fintech.dto.InvestimentoDTO;
import com.fintech.service.InvestimentoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/investimentos")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class InvestimentoController {

    private final InvestimentoService investimentoService;

    @PostMapping
    public ResponseEntity<InvestimentoDTO> criar(@Valid @RequestBody InvestimentoDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(investimentoService.criar(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<InvestimentoDTO> obterPorId(@PathVariable Long id) {
        return ResponseEntity.ok(investimentoService.obterPorId(id));
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<InvestimentoDTO>> listarPorUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(investimentoService.listarPorUsuario(usuarioId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InvestimentoDTO> atualizar(@PathVariable Long id, @Valid @RequestBody InvestimentoDTO dto) {
        return ResponseEntity.ok(investimentoService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        investimentoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
