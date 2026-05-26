package com.fintech.repository;

import com.fintech.model.Investimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvestimentoRepository extends JpaRepository<Investimento, Long> {
    List<Investimento> findByUsuarioId(Long usuarioId);

    List<Investimento> findByUsuarioIdAndTipo(Long usuarioId, String tipo);

    List<Investimento> findByUsuarioIdOrderByRentabilidadeDesc(Long usuarioId);
}
