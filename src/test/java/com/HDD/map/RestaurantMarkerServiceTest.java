package com.HDD.map;

import com.HDD.map.model.RestaurantMarker;
import com.HDD.map.repository.RestaurantMarkerRepository;
import com.HDD.map.service.RestaurantMarkerService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
public class RestaurantMarkerServiceTest {

    @Autowired
    RestaurantMarkerRepository restaurantMarkerRepository;

    @Autowired
    RestaurantMarkerService restaurantMarkerService;

    @Test
    void 추가(){
        RestaurantMarker marker = new RestaurantMarker();

        marker.setLat(3.234);
        marker.setLng(2.345);
        marker.setStoreName("안녕");
        marker.setAddress("서초중앙로");
        marker.setPhoneNum("010-22");
        marker.setLikes(3);

        Long saveId = restaurantMarkerService.add(marker);
        RestaurantMarker findMarker = restaurantMarkerService.findOne(saveId).get();

        Assertions.assertThat(marker.getStoreName()).isEqualTo(findMarker.getStoreName());

    }

}
