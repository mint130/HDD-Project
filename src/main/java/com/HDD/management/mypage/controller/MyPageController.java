package com.HDD.management.mypage.controller;

import com.HDD.common.Pair;
import com.HDD.management.model.Member;
import com.HDD.management.mypage.service.MyPageService;
import com.HDD.management.repository.MemberRepository;
import com.HDD.recruitment.model.ProjectBoard;
import com.HDD.recruitment.model.RoommateBoard;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth/mypage")
public class MyPageController {
    private final MemberRepository memberRepository;
    private final MyPageService myPageService;

    @GetMapping
    public ResponseEntity<?> getMyPage(@AuthenticationPrincipal UserDetails userDetails) throws Exception {
        String id = userDetails.getUsername();
        Member member = memberRepository.findBySid(id).orElseThrow(Exception::new);
        List<Pair<ProjectBoard, String>> projectBoards = myPageService.getProjectBoards(id);
        List<Pair<RoommateBoard, String>> roommateBoards = myPageService.getRoommateBoards(id);
        List<ProjectBoard> projectBookmarks = myPageService.getProjectBookmarks(id);
        List<RoommateBoard> roommateBookmarks = myPageService.getRoommateBookmarks(id);
        return ResponseEntity.ok(new Result(member, projectBoards, roommateBoards, projectBookmarks, roommateBookmarks));
    }

    @GetMapping("/update")
    public ResponseEntity<?> updateInfo(@AuthenticationPrincipal UserDetails userDetails) throws Exception {
        String id = userDetails.getUsername();
        Member member = memberRepository.findBySid(id).orElseThrow(Exception::new);
        return ResponseEntity.ok(member);
    }

    @Getter
    static class Result {
        private Member member;
        private List<Pair<ProjectBoard, String>> projectBoards;
        private List<Pair<RoommateBoard, String>> roommateBoards;
        private List<ProjectBoard> projectBookmarks;
        private List<RoommateBoard> roommateBookmarks;

        public Result(Member member, List<Pair<ProjectBoard, String>> projectBoards, List<Pair<RoommateBoard, String>> roommateBoards, List<ProjectBoard> projectBookmarks, List<RoommateBoard> roommateBookmarks) {
            this.member = member;
            this.projectBoards = projectBoards;
            this.roommateBoards = roommateBoards;
            this.projectBookmarks = projectBookmarks;
            this.roommateBookmarks = roommateBookmarks;
        }
    }
}
