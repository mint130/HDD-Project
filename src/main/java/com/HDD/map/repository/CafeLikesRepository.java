package com.HDD.map.repository;

import com.HDD.management.model.Member;
import com.HDD.map.model.CafeLikes;
import com.HDD.map.model.CafeMarker;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CafeLikesRepository extends JpaRepository<CafeLikes, Long> {

    boolean existsByMemberAndCafeMarker(Member member, CafeMarker cafeMarker);
}
