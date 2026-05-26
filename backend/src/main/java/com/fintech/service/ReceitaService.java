package com.fintech.service;

import com.fintech.dto.ReceitaDTO;
import com.fintech.model.Receita;
import com.fintech.model.Usuario;
import com.fintech.repository.ReceitaRepository;
import com.fintech.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ReceitaService {

    private final ReceitaRepository receitaRepository;
    private final UsuarioRepository usuarioRepository;

    public ReceitaDTO criar(ReceitaDTO dto) {
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        Receita receita = Receita.builder()
                .usuario(usuario)
                .descricao(dto.getDescricao())
                .fonte(dto.getFonte())
                .valor(dto.getValor())
                .data(dto.getData())
                .build();

        Receita saved = receitaRepository.save(receita);
        return toDTO(saved);
    }

    public ReceitaDTO obterPorId(Long id) {
        return receitaRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new IllegalArgumentException("Receita não encontrada"));
    }

    public List<ReceitaDTO> listarPorUsuario(Long usuarioId) {
        return receitaRepository.findByUsuarioIdOrderByDataDesc(usuarioId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public ReceitaDTO atualizar(Long id, ReceitaDTO dto) {
        Receita receita = receitaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Receita não encontrada"));

        receita.setDescricao(dto.getDescricao());
        receita.setFonte(dto.getFonte());
        receita.setValor(dto.getValor());
        receita.setData(dto.getData());

        Receita updated = receitaRepository.save(receita);
        return toDTO(updated);
    }

    public void deletar(Long id) {
        if (!receitaRepository.existsById(id)) {
            throw new IllegalArgumentException("Receita não encontrada");
        }
        receitaRepository.deleteById(id);
    }

    private ReceitaDTO toDTO(Receita receita) {
        return ReceitaDTO.builder()
                .id(receita.getId())
                .usuarioId(receita.getUsuario().getId())
                .descricao(receita.getDescricao())
                .fonte(receita.getFonte())
                .valor(receita.getValor())
                .data(receita.getData())
                .build();
    }
}
