package com.HDD.map.repository;

import com.HDD.management.model.Member;
import com.HDD.map.model.RestaurantLikes;
import com.HDD.map.model.RestaurantMarker;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RestaurantLikesRepository extends JpaRepository<RestaurantLikes, Long> {
    boolean existsByMemberAndRestaurantMarker(Member member, RestaurantMarker restaurantMarker);
}
