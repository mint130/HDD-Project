package com.HDD.map.controller;

import com.HDD.common.Pair;
import com.HDD.management.model.Member;
import com.HDD.management.repository.MemberRepository;
import com.HDD.management.webDto.MessageResponse;
import com.HDD.map.mapDto.MarkerRequest;
import com.HDD.map.model.RestaurantMarker;
import com.HDD.map.repository.RestaurantMarkerRepository;
import com.HDD.map.service.RestaurantLikesService;
import com.HDD.map.service.RestaurantMarkerService;
import com.HDD.recruitment.model.ProjectBoard;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/map")
@RequiredArgsConstructor
public class RestaurantController {

    private final RestaurantMarkerService restaurantMarkerService;
    private final RestaurantMarkerRepository restaurantMarkerRepository;
    private final RestaurantLikesService restaurantLikesService;
    private final MemberRepository memberRepository;

    @PostMapping("/addMarker")
    public ResponseEntity<?> addMarker(@RequestBody MarkerRequest markerRequest)
    {
        RestaurantMarker temp = new RestaurantMarker(markerRequest.getLat(), markerRequest.getLng(), markerRequest.getStoreName(), markerRequest.getAddress(), markerRequest.getPhoneNum(), markerRequest.getCategory(), markerRequest.getLikes());
        restaurantMarkerService.add(temp);
        System.out.println("저장됨");

        return ResponseEntity.ok(new MessageResponse("음식점 마커가 저장되었습니다."));
    }

    @GetMapping()
    public ResponseEntity<?> boardList() throws Exception {
        List<RestaurantMarker> restaurantMarkerList = restaurantMarkerService.findMarkers();

        return ResponseEntity.ok(restaurantMarkerList);
    }

    @GetMapping("/addLike")
    public void addLike(@AuthenticationPrincipal UserDetails userDetails, @RequestParam String storeName){
        Member foundMember = memberRepository.findBySid(userDetails.getUsername()).get();
        RestaurantMarker foundMarker = restaurantMarkerRepository.findByStoreName(storeName).get();
        restaurantLikesService.addLike(foundMarker.getId(), foundMember);
    }

    @GetMapping("/addDislike")
    public void addDislike(@RequestParam String storeName){
        restaurantMarkerService.addDislike(storeName);
    }

}
