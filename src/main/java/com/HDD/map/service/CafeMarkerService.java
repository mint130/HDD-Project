package com.HDD.map.service;

import com.HDD.map.model.CafeMarker;
import com.HDD.map.model.RestaurantMarker;
import com.HDD.map.repository.CafeMarkerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CafeMarkerService {

    private final CafeMarkerRepository cafeMarkerRepository;

    public Long add(CafeMarker cafeMarker){
        validateDuplicateMarker(cafeMarker); //중복 회원 검증

        cafeMarkerRepository.save(cafeMarker);

        return cafeMarker.getId();
    }

    public void validateDuplicateMarker(CafeMarker cafeMarker){
        cafeMarkerRepository.findByStoreName(cafeMarker.getStoreName()).ifPresent(m -> {
            throw new IllegalStateException("이미 등록된 가게입니다.");
        });
    }

    public List<CafeMarker> findMarkers() {
        return cafeMarkerRepository.findAll();
    }

    public Optional<CafeMarker> findOne(Long memberId) {
        return cafeMarkerRepository.findById(memberId);
    }
}
