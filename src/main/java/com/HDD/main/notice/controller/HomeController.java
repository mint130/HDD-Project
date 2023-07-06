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
public class HomeController {
    private Crawling crawling = new Crawling();

    @GetMapping("/")
    public ResponseEntity<?> home(@RequestParam(required = false) String major, Model model) throws Exception {
        List<Notice> notices = crawling.getData(major);
        model.addAttribute("notices", notices);
        return ResponseEntity.ok(new MessageResponse("성공"));
    }

}
