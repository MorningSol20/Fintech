package com.fintech.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "TB_DIVIDA")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Divida {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "divida_seq")
    @SequenceGenerator(name = "divida_seq", sequenceName = "SEQ_DIVIDA", allocationSize = 1)
    @Column(name = "ID_DIVIDA")
    private Long id;

    @NotNull(message = "Usuário é obrigatório")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_USUARIO", nullable = false)
    private Usuario usuario;

    @NotNull(message = "Credor é obrigatório")
    @Column(name = "DS_CREDOR", nullable = false, length = 255)
    private String credor;

    @NotNull(message = "Descrição é obrigatória")
    @Column(name = "DS_DESCRICAO", nullable = false, length = 255)
    private String descricao;

    @NotNull(message = "Valor é obrigatório")
    @Positive(message = "Valor deve ser positivo")
    @Column(name = "VL_DIVIDA", nullable = false)
    private Double valor;

    @NotNull(message = "Data de vencimento é obrigatória")
    @Column(name = "DT_VENCIMENTO", nullable = false)
    private LocalDate dataVencimento;

    @Column(name = "ST_DIVIDA", nullable = false, length = 20)
    @Builder.Default
    private String status = "ativa";

    @Column(name = "DT_CRIACAO", nullable = false, updatable = false)
    private LocalDateTime dataCriacao;

    @Column(name = "DT_ATUALIZACAO")
    private LocalDateTime dataAtualizacao;

    @PrePersist
    public void prePersist() {
        this.dataCriacao = LocalDateTime.now();
        this.dataAtualizacao = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.dataAtualizacao = LocalDateTime.now();
    }
}
