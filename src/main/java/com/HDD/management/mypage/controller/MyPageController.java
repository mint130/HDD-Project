package com.HDD.management.mypage.controller;

import com.HDD.common.Pair;
import com.HDD.management.model.Member;
import com.HDD.management.mypage.service.MyPageService;
import com.HDD.management.mypage.webDto.PasswordRequest;
import com.HDD.management.repository.MemberRepository;
import com.HDD.management.service.EmailService;
import com.HDD.recruitment.model.ProjectBoard;
import com.HDD.recruitment.model.RoommateBoard;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth/mypage")
public class MyPageController {
    private final MemberRepository memberRepository;
    private final MyPageService myPageService;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    // 회원 정보
    @GetMapping("/info")
    public ResponseEntity<?> getMyPage(@AuthenticationPrincipal UserDetails userDetails) throws Exception {
        String id = userDetails.getUsername();
        Member member = memberRepository.findBySid(id).orElseThrow(Exception::new);
        return ResponseEntity.ok(member);
    }

    // 내가 쓴 프로젝트
    @GetMapping("/project")
    public ResponseEntity<?> getMyProject(@AuthenticationPrincipal UserDetails userDetails) throws Exception {
        String id = userDetails.getUsername();
        List<Pair<ProjectBoard, String>> projectBoards = myPageService.getProjectBoards(id);
        return ResponseEntity.ok(projectBoards);
    }

    // 내가 쓴 룸메이트
    @GetMapping("/roommate")
    public ResponseEntity<?> getMyRoommate(@AuthenticationPrincipal UserDetails userDetails) throws Exception {
        String id = userDetails.getUsername();
        List<Pair<RoommateBoard, String>> roommateBoards = myPageService.getRoommateBoards(id);
        return ResponseEntity.ok(roommateBoards);
    }

    // 내가 북마크한 프로젝트
    @GetMapping("/bookmark/project")
    public ResponseEntity<?> getBookmarkedProject(@AuthenticationPrincipal UserDetails userDetails) throws Exception {
        String id = userDetails.getUsername();
        List<Pair<ProjectBoard, String>> projectBookmarks = myPageService.getProjectBookmarks(id);
        return ResponseEntity.ok(projectBookmarks);
    }

    // 내가 북마크한 룸메이드
    @GetMapping("/bookmark/roommate")
    public ResponseEntity<?> getBookmarkedRoommate(@AuthenticationPrincipal UserDetails userDetails) throws Exception {
        String id = userDetails.getUsername();
        List<Pair<RoommateBoard, String>> roommateBookmarks = myPageService.getRoommateBookmarks(id);
        return ResponseEntity.ok(roommateBookmarks);
    }

    @GetMapping("/update")
    public ResponseEntity<?> updateInfo(@AuthenticationPrincipal UserDetails userDetails) throws Exception {
        String id = userDetails.getUsername();
        Member member = memberRepository.findBySid(id).orElseThrow(Exception::new);
        return ResponseEntity.ok(member);
    }

    // 이메일 발송
    @GetMapping("/email")
    public ResponseEntity<?> sendEmail(@RequestParam String email) throws Exception {
        String certification = emailService.sendSimpleMessage(email);
        return ResponseEntity.ok(certification);
    }

    // 비밀번호 변경
    @PostMapping("/update/password")
    public ResponseEntity<?> updatePassword(@AuthenticationPrincipal UserDetails userDetails, @RequestBody PasswordRequest request) throws Exception {
        Member member = memberRepository.findBySid(userDetails.getUsername())
                .orElseThrow(Exception::new);
        member.setPassword(passwordEncoder.encode(request.getPassword()));
        memberRepository.save(member);
//        System.out.println(passwordEncoder.matches(passwordEncoder.encode(password), member.getPassword()));
        return ResponseEntity.ok("비밀번호 변경");
    }

//    @Getter
//    static class Result {
//        private Member member;
//        private List<Pair<ProjectBoard, String>> projectBoards;
//        private List<Pair<RoommateBoard, String>> roommateBoards;
//        private List<ProjectBoard> projectBookmarks;
//        private List<RoommateBoard> roommateBookmarks;
//
//        public Result(Member member, List<Pair<ProjectBoard, String>> projectBoards, List<Pair<RoommateBoard, String>> roommateBoards, List<ProjectBoard> projectBookmarks, List<RoommateBoard> roommateBookmarks) {
//            this.member = member;
//            this.projectBoards = projectBoards;
//            this.roommateBoards = roommateBoards;
//            this.projectBookmarks = projectBookmarks;
//            this.roommateBookmarks = roommateBookmarks;
//        }
//    }
}
