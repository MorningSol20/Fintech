package com.fintech.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsuarioDTO {
    private Long id;
    private String nome;
    private String email;
    private LocalDateTime dataCriacao;
    private List<ReceitaDTO> receitas;
    private List<DespesaDTO> despesas;
    private List<DividaDTO> dividas;
}
