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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/map")
@RequiredArgsConstructor
public class RestaurantController {

    private final RestaurantMarkerService restaurantMarkerService;
    private final RestaurantMarkerRepository restaurantMarkerRepository;
    private final RestaurantLikesService restaurantLikesService;
    private final MemberRepository memberRepository;

    @PostMapping("/addMarker")
    public ResponseEntity<?> addMarker(@RequestBody MarkerRequest markerRequest)
    {
        double lat = Double.parseDouble(markerRequest.getLat());
        double lng = Double.parseDouble(markerRequest.getLng());
        int category = Integer.parseInt(markerRequest.getCategory());
        RestaurantMarker temp = new RestaurantMarker(lat, lng, markerRequest.getStoreName(), markerRequest.getAddress(), markerRequest.getPhoneNum(), category, 0);
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
    public ResponseEntity<?> addLike(@AuthenticationPrincipal UserDetails userDetails, @RequestParam String storeName){
        Member foundMember = memberRepository.findBySid(userDetails.getUsername()).get();
        RestaurantMarker foundMarker = restaurantMarkerRepository.findByStoreName(storeName).get();
        restaurantLikesService.addLike(foundMarker.getId(), foundMember);

        return ResponseEntity.ok(new MessageResponse("좋아요"));
    }

//    @GetMapping("/addDislike")
//    public void addDislike(@RequestParam String storeName){
//        restaurantMarkerService.addDislike(storeName);
//    }

}