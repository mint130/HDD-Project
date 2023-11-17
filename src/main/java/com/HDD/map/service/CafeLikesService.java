package com.HDD.map.service;

import com.HDD.management.model.Member;
import com.HDD.map.model.CafeLikes;
import com.HDD.map.model.CafeMarker;
import com.HDD.map.model.RestaurantLikes;
import com.HDD.map.model.RestaurantMarker;
import com.HDD.map.repository.CafeLikesRepository;
import com.HDD.map.repository.CafeMarkerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class CafeLikesService {

    private final CafeMarkerService cafeMarkerService;
    private final CafeLikesRepository cafeLikesRepository;

    public void addLike(Long markerId, Member member){

        CafeMarker cafeMarker = cafeMarkerService.findOne(markerId).get();

        if (!cafeLikesRepository.existsByMemberAndCafeMarker(member, cafeMarker))
        {
            cafeMarker.setLikesCount(cafeMarker.getLikesCount()+1);
            cafeLikesRepository.save(new CafeLikes(cafeMarker, member));
        }
        else {
            throw new IllegalStateException("이미 좋아요를 눌렀습니다.");
        }

    }

    public void addDislike(Long markerId, Member member){

        CafeMarker cafeMarker = cafeMarkerService.findOne(markerId).get();

        if (!cafeLikesRepository.existsByMemberAndCafeMarker(member, cafeMarker))
        {
            cafeMarker.setDislikesCount(cafeMarker.getDislikesCount()+1);
            cafeLikesRepository.save(new CafeLikes(cafeMarker, member));
        }
        else {
            throw new IllegalStateException("이미 싫어요를 눌렀습니다.");
        }

    }



}
