package com.fintech.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvestimentoDTO {
    private Long id;
    private Long usuarioId;
    private String nome;
    private String tipo;
    private Double valorInvestido;
    private Double valorAtual;
    private Double rentabilidade;
}
