package com.HDD.promotion.controller;

import com.HDD.common.Pair;
import com.HDD.management.webDto.MessageResponse;
import com.HDD.promotion.model.Promotion;
import com.HDD.promotion.service.PromotionService;
import com.HDD.recruitment.service.FileService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/promotion")
public class PromotionController {

    private final PromotionService promotionService;

    @GetMapping()
    public ResponseEntity<?> getPromotions(@RequestParam(value = "hall", required = false) String hall) throws Exception {
        List<Pair<Promotion, String>> promotionList;
        if (hall == null) {
            promotionList = promotionService.getAllPromotions();
        } else {
            promotionList = promotionService.getPromotions(hall);
        }
        return ResponseEntity.ok(promotionList);
    }

    @PostMapping(value = "/add", consumes = "multipart/form-data")
    public ResponseEntity<?> addPromotion(@RequestBody Promotion promotion, @RequestPart MultipartFile file, String nameFile) throws Exception {
        promotion.setImageName(nameFile);
        promotionService.insertPromotion(promotion, file, nameFile);
        return ResponseEntity.ok(new MessageResponse("추가되었습니다"));
    }
}
