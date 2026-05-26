package com.fintech.service;

import com.fintech.dto.InvestimentoDTO;
import com.fintech.model.Investimento;
import com.fintech.model.Usuario;
import com.fintech.repository.InvestimentoRepository;
import com.fintech.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class InvestimentoService {

    private final InvestimentoRepository investimentoRepository;
    private final UsuarioRepository usuarioRepository;

    public InvestimentoDTO criar(InvestimentoDTO dto) {
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        Investimento investimento = Investimento.builder()
                .usuario(usuario)
                .nome(dto.getNome())
                .tipo(dto.getTipo())
                .valorInvestido(dto.getValorInvestido())
                .valorAtual(dto.getValorAtual())
                .build();

        Investimento saved = investimentoRepository.save(investimento);
        return toDTO(saved);
    }

    public InvestimentoDTO obterPorId(Long id) {
        return investimentoRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new IllegalArgumentException("Investimento não encontrado"));
    }

    public List<InvestimentoDTO> listarPorUsuario(Long usuarioId) {
        return investimentoRepository.findByUsuarioIdOrderByRentabilidadeDesc(usuarioId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public InvestimentoDTO atualizar(Long id, InvestimentoDTO dto) {
        Investimento investimento = investimentoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Investimento não encontrado"));

        investimento.setNome(dto.getNome());
        investimento.setTipo(dto.getTipo());
        investimento.setValorInvestido(dto.getValorInvestido());
        investimento.setValorAtual(dto.getValorAtual());

        Investimento updated = investimentoRepository.save(investimento);
        return toDTO(updated);
    }

    public void deletar(Long id) {
        if (!investimentoRepository.existsById(id)) {
            throw new IllegalArgumentException("Investimento não encontrado");
        }
        investimentoRepository.deleteById(id);
    }

    private InvestimentoDTO toDTO(Investimento investimento) {
        return InvestimentoDTO.builder()
                .id(investimento.getId())
                .usuarioId(investimento.getUsuario().getId())
                .nome(investimento.getNome())
                .tipo(investimento.getTipo())
                .valorInvestido(investimento.getValorInvestido())
                .valorAtual(investimento.getValorAtual())
                .rentabilidade(investimento.getRentabilidade())
                .build();
    }
}
