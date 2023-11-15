package com.HDD.map.repository;

import com.HDD.map.model.CafeMarker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CafeMarkerRepository extends JpaRepository<CafeMarker, Long> {

    CafeMarker save(CafeMarker cafeMarker);

    List<CafeMarker> findAll();

    Optional<CafeMarker> findById(Long id);

    Optional<CafeMarker> findByStoreName(String storeName);
}
