package com.HDD.map.controller;

import com.HDD.management.webDto.MessageResponse;
import com.HDD.map.model.RestaurantMarker;
import com.HDD.map.service.RestaurantMarkerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/map")
@RequiredArgsConstructor
public class RestaurantController {

    private final RestaurantMarkerService restaurantMarkerService;

    @PostMapping("/addMarker")
    public ResponseEntity<?> addMarker(@RequestBody double lat,
                                       @RequestBody double lng,
                                       @RequestBody String storeName,
                                       @RequestBody String address,
                                       @RequestBody String phoneNum,
                                       @RequestBody int category)
    {
        RestaurantMarker temp = new RestaurantMarker(lat, lng, storeName, address, phoneNum, category);
        restaurantMarkerService.add(temp);

        return ResponseEntity.ok(new MessageResponse("음식점 마커가 저장되었습니다."));
    }



    @GetMapping("/addLike")
    public void addLike(@RequestParam String storeName){
        restaurantMarkerService.addLike(storeName);
    }

    @GetMapping("/addDislike")
    public void addDislike(@RequestParam String storeName){
        restaurantMarkerService.addDislike(storeName);
    }

}
