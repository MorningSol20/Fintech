package com.fintech.service;

import com.fintech.dto.DividaDTO;
import com.fintech.model.Divida;
import com.fintech.model.Usuario;
import com.fintech.repository.DividaRepository;
import com.fintech.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class DividaService {

    private final DividaRepository dividaRepository;
    private final UsuarioRepository usuarioRepository;

    public DividaDTO criar(DividaDTO dto) {
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        Divida divida = Divida.builder()
                .usuario(usuario)
                .credor(dto.getCredor())
                .descricao(dto.getDescricao())
                .valor(dto.getValor())
                .dataVencimento(dto.getDataVencimento())
                .status("ativa")
                .build();

        Divida saved = dividaRepository.save(divida);
        return toDTO(saved);
    }

    public DividaDTO obterPorId(Long id) {
        return dividaRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new IllegalArgumentException("Dívida não encontrada"));
    }

    public List<DividaDTO> listarPorUsuario(Long usuarioId) {
        return dividaRepository.findByUsuarioIdOrderByDataVencimentoAsc(usuarioId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public DividaDTO atualizar(Long id, DividaDTO dto) {
        Divida divida = dividaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Dívida não encontrada"));

        divida.setCredor(dto.getCredor());
        divida.setDescricao(dto.getDescricao());
        divida.setValor(dto.getValor());
        divida.setDataVencimento(dto.getDataVencimento());

        Divida updated = dividaRepository.save(divida);
        return toDTO(updated);
    }

    public DividaDTO marcarComoPaga(Long id) {
        Divida divida = dividaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Dívida não encontrada"));

        divida.setStatus("paga");
        Divida updated = dividaRepository.save(divida);
        return toDTO(updated);
    }

    public void deletar(Long id) {
        if (!dividaRepository.existsById(id)) {
            throw new IllegalArgumentException("Dívida não encontrada");
        }
        dividaRepository.deleteById(id);
    }

    private DividaDTO toDTO(Divida divida) {
        return DividaDTO.builder()
                .id(divida.getId())
                .usuarioId(divida.getUsuario().getId())
                .credor(divida.getCredor())
                .descricao(divida.getDescricao())
                .valor(divida.getValor())
                .dataVencimento(divida.getDataVencimento())
                .status(divida.getStatus())
                .build();
    }
}
