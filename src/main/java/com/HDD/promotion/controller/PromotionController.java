package com.HDD.promotion.controller;

import com.HDD.management.webDto.MessageResponse;
import com.HDD.promotion.model.Promotion;
import com.HDD.promotion.service.PromotionService;
import com.HDD.recruitment.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.parameters.P;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/promotion")
public class PromotionController {

    private final PromotionService promotionService;
    private final FileService fileService;

    @GetMapping()
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
    public ResponseEntity<?> addPromotion(@RequestBody Promotion promotion, @RequestPart MultipartFile file, String nameFile) throws Exception {
        String imageUrl = fileService.uploadFiles(file, nameFile);
        promotion.setImageUrl(imageUrl);
        promotionService.insertPromotion(promotion);
        return ResponseEntity.ok(new MessageResponse("추가되었습니다"));
    }

    @GetMapping("/imageTest")
    public ResponseEntity<?> test(String url) throws Exception {
        return ResponseEntity.ok(fileService.getImageUrl(url));
    }

    @PostMapping("/fileTest")
    public ResponseEntity<?> uploadTest(@RequestPart MultipartFile file, String fileName) throws Exception{
        return ResponseEntity.ok(fileService.uploadFiles(file, fileName));
    }
}
