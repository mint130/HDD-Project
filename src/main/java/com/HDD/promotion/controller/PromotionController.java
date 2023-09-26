package com.HDD.promotion.controller;

import com.HDD.management.webDto.MessageResponse;
import com.HDD.promotion.model.Promotion;
import com.HDD.promotion.service.PromotionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/promotion")
public class PromotionController {

    private final PromotionService promotionService;

    @GetMapping()
    @PreAuthorize("hasRole('MEMBER') or hasRole('ADMIN')")
    public ResponseEntity<?> getPromotions(@RequestParam(value = "hall", required = false) String hall) throws Exception {
        List<Promotion> promotionList;
        if (hall == null) {
            promotionList = promotionService.getAllPromotions();
        } else {
            promotionList = promotionService.getPromotions(hall);
        }
        return ResponseEntity.ok(promotionList);
    }


    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addPromotion(@RequestBody Promotion promotion) throws Exception {
        promotionService.insertPromotion(promotion);
        return ResponseEntity.ok(new MessageResponse("추가되었습니다"));
    }


}
