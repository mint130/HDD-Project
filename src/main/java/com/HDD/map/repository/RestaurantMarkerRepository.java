package com.HDD.map.repository;

import com.HDD.map.model.RestaurantMarker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RestaurantMarkerRepository extends JpaRepository<RestaurantMarker, Long> {

    RestaurantMarker save(RestaurantMarker restaurantMarker);
    List<RestaurantMarker> findAll();
    Optional<RestaurantMarker> findById(Long id);
    Optional<RestaurantMarker> findByStoreName(String storeName);
}
