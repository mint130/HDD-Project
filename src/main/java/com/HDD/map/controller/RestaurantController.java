package com.HDD.map.controller;

import com.HDD.map.model.RestaurantMarker;
import com.HDD.map.service.RestaurantMarkerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/map")
@RequiredArgsConstructor
public class RestaurantController {

    private final RestaurantMarkerService restaurantMarkerService;

    @GetMapping("/addMarker")
    public void addMarker(@RequestParam double lat,
                            @RequestParam double lng,
                            @RequestParam String storeName,
                            @RequestParam String address,
                            @RequestParam String phoneNum,
                            @RequestParam int category)
    {
        RestaurantMarker temp = new RestaurantMarker(lat, lng, storeName, address, phoneNum, category);
        restaurantMarkerService.add(temp);
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
