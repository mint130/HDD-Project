package com.HDD.map.controller;

import com.HDD.management.webDto.MessageResponse;
import com.HDD.management.webDto.SignupRequest;
import com.HDD.map.model.RestaurantMarker;
import com.HDD.map.service.RestaurantMarkerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/map")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)

public class RestaurantController {

    private final RestaurantMarkerService restaurantMarkerService;

    @PostMapping("/addMarker")
    public void addMarker(@RequestBody double lat,
                            @RequestBody double lng,
                            @RequestBody String storeName,
                            @RequestBody String address,
                            @RequestBody String phoneNum,
                            @RequestBody int category)
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
