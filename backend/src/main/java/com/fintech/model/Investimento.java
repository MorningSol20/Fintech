package com.fintech.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "TB_INVESTIMENTO")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Investimento {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "investimento_seq")
    @SequenceGenerator(name = "investimento_seq", sequenceName = "SEQ_INVESTIMENTO", allocationSize = 1)
    @Column(name = "ID_INVESTIMENTO")
    private Long id;

    @NotNull(message = "Usuário é obrigatório")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_USUARIO", nullable = false)
    private Usuario usuario;

    @NotNull(message = "Nome é obrigatório")
    @Column(name = "NM_INVESTIMENTO", nullable = false, length = 255)
    private String nome;

    @NotNull(message = "Tipo é obrigatório")
    @Column(name = "DS_TIPO", nullable = false, length = 100)
    private String tipo;

    @NotNull(message = "Valor investido é obrigatório")
    @Positive(message = "Valor investido deve ser positivo")
    @Column(name = "VL_INVESTIDO", nullable = false)
    private Double valorInvestido;

    @NotNull(message = "Valor atual é obrigatório")
    @Positive(message = "Valor atual deve ser positivo")
    @Column(name = "VL_ATUAL", nullable = false)
    private Double valorAtual;

    @Column(name = "TX_RENTABILIDADE")
    private Double rentabilidade;

    @Column(name = "DT_CRIACAO", nullable = false, updatable = false)
    private LocalDateTime dataCriacao;

    @Column(name = "DT_ATUALIZACAO")
    private LocalDateTime dataAtualizacao;

    @PrePersist
    public void prePersist() {
        this.dataCriacao = LocalDateTime.now();
        this.dataAtualizacao = LocalDateTime.now();
        calcularRentabilidade();
    }

    @PreUpdate
    public void preUpdate() {
        this.dataAtualizacao = LocalDateTime.now();
        calcularRentabilidade();
    }

    private void calcularRentabilidade() {
        if (valorInvestido != null && valorInvestido > 0) {
            this.rentabilidade = ((valorAtual - valorInvestido) / valorInvestido) * 100;
        }
    }
}
