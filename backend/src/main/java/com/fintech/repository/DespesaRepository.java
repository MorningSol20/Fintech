package com.fintech.repository;

import com.fintech.model.Despesa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DespesaRepository extends JpaRepository<Despesa, Long> {
    List<Despesa> findByUsuarioId(Long usuarioId);

    List<Despesa> findByUsuarioIdAndDataBetween(Long usuarioId, LocalDate dataInicio, LocalDate dataFim);

    List<Despesa> findByUsuarioIdAndCategoria(Long usuarioId, String categoria);

    List<Despesa> findByUsuarioIdOrderByDataDesc(Long usuarioId);
}
