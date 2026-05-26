package com.fintech.controller;

import com.fintech.dto.DividaDTO;
import com.fintech.service.DividaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dividas")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class DividaController {

    private final DividaService dividaService;

    @PostMapping
    public ResponseEntity<DividaDTO> criar(@Valid @RequestBody DividaDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(dividaService.criar(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DividaDTO> obterPorId(@PathVariable Long id) {
        return ResponseEntity.ok(dividaService.obterPorId(id));
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<DividaDTO>> listarPorUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(dividaService.listarPorUsuario(usuarioId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DividaDTO> atualizar(@PathVariable Long id, @Valid @RequestBody DividaDTO dto) {
        return ResponseEntity.ok(dividaService.atualizar(id, dto));
    }

    @PatchMapping("/{id}/pagar")
    public ResponseEntity<DividaDTO> marcarComoPaga(@PathVariable Long id) {
        return ResponseEntity.ok(dividaService.marcarComoPaga(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        dividaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
