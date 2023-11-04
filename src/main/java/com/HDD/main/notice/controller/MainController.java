package com.HDD.main.notice.controller;

import com.HDD.main.notice.crawling.Crawling;
import com.HDD.main.notice.model.Notice;
import com.HDD.management.webDto.MessageResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/")
public class MainController {
    private Crawling crawling = new Crawling();

    /*
     * 1. 공지사항 크롤링(기본 : 전체 공지)
     * 2. 최근 게시글 <- 구인? 맛집? 홍보?
     */
    @GetMapping()
    public ResponseEntity<?> home(@RequestParam(required = false) String major) throws Exception {
        List<Notice> notices;
        if (major == null) {
            notices = crawling.getNotice("main");
        } else {
            notices = crawling.getNotice(major);
        }

        return ResponseEntity.ok(notices);
    }

}
