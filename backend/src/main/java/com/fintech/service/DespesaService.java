package com.fintech.service;

import com.fintech.dto.DespesaDTO;
import com.fintech.model.Despesa;
import com.fintech.model.Usuario;
import com.fintech.repository.DespesaRepository;
import com.fintech.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class DespesaService {

    private final DespesaRepository despesaRepository;
    private final UsuarioRepository usuarioRepository;

    public DespesaDTO criar(DespesaDTO dto) {
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        Despesa despesa = Despesa.builder()
                .usuario(usuario)
                .nome(dto.getNome())
                .categoria(dto.getCategoria())
                .valor(dto.getValor())
                .data(dto.getData())
                .build();

        Despesa saved = despesaRepository.save(despesa);
        return toDTO(saved);
    }

    public DespesaDTO obterPorId(Long id) {
        return despesaRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new IllegalArgumentException("Despesa não encontrada"));
    }

    public List<DespesaDTO> listarPorUsuario(Long usuarioId) {
        return despesaRepository.findByUsuarioIdOrderByDataDesc(usuarioId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public DespesaDTO atualizar(Long id, DespesaDTO dto) {
        Despesa despesa = despesaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Despesa não encontrada"));

        despesa.setNome(dto.getNome());
        despesa.setCategoria(dto.getCategoria());
        despesa.setValor(dto.getValor());
        despesa.setData(dto.getData());

        Despesa updated = despesaRepository.save(despesa);
        return toDTO(updated);
    }

    public void deletar(Long id) {
        if (!despesaRepository.existsById(id)) {
            throw new IllegalArgumentException("Despesa não encontrada");
        }
        despesaRepository.deleteById(id);
    }

    private DespesaDTO toDTO(Despesa despesa) {
        return DespesaDTO.builder()
                .id(despesa.getId())
                .usuarioId(despesa.getUsuario().getId())
                .nome(despesa.getNome())
                .categoria(despesa.getCategoria())
                .valor(despesa.getValor())
                .data(despesa.getData())
                .build();
    }
}
