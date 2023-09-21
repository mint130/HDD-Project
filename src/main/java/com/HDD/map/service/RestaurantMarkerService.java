package com.HDD.map.service;

import com.HDD.map.model.RestaurantMarker;
import com.HDD.map.repository.RestaurantMarkerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RestaurantMarkerService {

    private final RestaurantMarkerRepository restaurantMarkerRepository;

    public Long add(RestaurantMarker restaurantMarker){
        validateDuplicateMarker(restaurantMarker); //중복 회원 검증
        restaurantMarkerRepository.save(restaurantMarker);

        return restaurantMarker.getId();
    }

    public void validateDuplicateMarker(RestaurantMarker restaurantMarker){
        restaurantMarkerRepository.findByStoreName(restaurantMarker.getStoreName()).ifPresent(m -> {
            throw new IllegalStateException("이미 등록된 가게입니다.");
        });
    }

    public List<RestaurantMarker> findMembers() {
        return restaurantMarkerRepository.findAll();
    }

    public Optional<RestaurantMarker> findOne(Long memberId) {
        return restaurantMarkerRepository.findById(memberId);
    }

}
