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

        if(restaurantMarker.getCategory() > 4 && restaurantMarker.getCategory() < 1)
        {
            throw new IllegalStateException("카테고리 오류");
        }
        restaurantMarkerRepository.save(restaurantMarker);

        return restaurantMarker.getId();
    }

    public void validateDuplicateMarker(RestaurantMarker restaurantMarker){
        restaurantMarkerRepository.findByStoreName(restaurantMarker.getStoreName()).ifPresent(m -> {
            throw new IllegalStateException("이미 등록된 가게입니다.");
        });
    }

    public List<RestaurantMarker> findMarkers() {
        return restaurantMarkerRepository.findAll();
    }

    public Optional<RestaurantMarker> findOne(Long memberId) {
        return restaurantMarkerRepository.findById(memberId);
    }

//    public Long addLike(String storeName){
//        RestaurantMarker foundMarker = restaurantMarkerRepository.findByStoreName(storeName).get();
//        int currentLikes = foundMarker.getLikesCount();
//        foundMarker.setLikesCount(currentLikes++);
//
//        return foundMarker.getId();
//    }

//    public Long addDislike(String storeName){
//        RestaurantMarker foundMarker = restaurantMarkerRepository.findByStoreName(storeName).get();
//        int currentDislikes = foundMarker.getDislikes();
//        foundMarker.setDislikes(currentDislikes++);
//
//        return foundMarker.getId();
//    }

    public List<RestaurantMarker> categoryFind(int category){
        return restaurantMarkerRepository.findByCategory(category);
    }

}
