package com.HDD.map.controller;

import com.HDD.management.model.Member;
import com.HDD.management.repository.MemberRepository;
import com.HDD.management.webDto.MessageResponse;
import com.HDD.map.mapDto.MarkerRequest;
import com.HDD.map.model.CafeMarker;
import com.HDD.map.model.RestaurantMarker;
import com.HDD.map.repository.CafeMarkerRepository;
import com.HDD.map.service.CafeLikesService;
import com.HDD.map.service.CafeMarkerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/mapcafe")
@RequiredArgsConstructor
public class CafeController {

    private final CafeMarkerService cafeMarkerService;
    private final CafeMarkerRepository cafeMarkerRepository;
    private final CafeLikesService cafeLikesService;
    private final MemberRepository memberRepository;

    @PostMapping("/addMarker")
    public ResponseEntity<?> addMarker(@RequestBody MarkerRequest markerRequest)
    {
        double lat = Double.parseDouble(markerRequest.getLat());
        double lng = Double.parseDouble(markerRequest.getLng());
        int category = Integer.parseInt(markerRequest.getCategory());
        CafeMarker temp = new CafeMarker(lat, lng, markerRequest.getStoreName(), markerRequest.getAddress(), markerRequest.getPhoneNum());
        cafeMarkerService.add(temp);
        System.out.println("저장됨");

        return ResponseEntity.ok(new MessageResponse("음식점 마커가 저장되었습니다."));
    }

    @GetMapping()
    public ResponseEntity<?> boardList() throws Exception {
        List<CafeMarker> cafeMarkerList = cafeMarkerService.findMarkers();

        return ResponseEntity.ok(cafeMarkerList);
    }

    @GetMapping("/addLike")
    public ResponseEntity<?> addLike(@AuthenticationPrincipal UserDetails userDetails, @RequestParam String storeName){
        Member foundMember = memberRepository.findBySid(userDetails.getUsername()).get();
        CafeMarker foundMarker = cafeMarkerRepository.findByStoreName(storeName).get();
        cafeLikesService.addLike(foundMarker.getId(), foundMember);

        return ResponseEntity.ok(new MessageResponse("좋아요"));
    }

    @GetMapping("/addDislike")
    public ResponseEntity<?> addDislike(@AuthenticationPrincipal UserDetails userDetails, @RequestParam String storeName){
        Member foundMember = memberRepository.findBySid(userDetails.getUsername()).get();
        CafeMarker foundMarker = cafeMarkerRepository.findByStoreName(storeName).get();
        cafeLikesService.addDislike(foundMarker.getId(), foundMember);

        return ResponseEntity.ok(new MessageResponse("싫어요"));
    }
}
