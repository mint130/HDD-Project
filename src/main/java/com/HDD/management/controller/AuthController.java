package com.HDD.management.controller;

import com.HDD.management.model.ERole;
import com.HDD.management.model.Role;
import com.HDD.management.repository.MemberRepository;
import com.HDD.management.token.JwtUtils;
import com.HDD.management.webDto.SignupRequest;
import com.HDD.management.model.Member;
import com.HDD.management.repository.RoleRepository;
import com.HDD.management.security.MemberDetails;
import com.HDD.management.service.EmailService;
import com.HDD.management.token.JwtResponse;
import com.HDD.management.webDto.LoginRequest;
import com.HDD.management.webDto.MessageResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final MemberRepository memberRepository;
    private final RoleRepository roleRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    // 로그인
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getSid().toUpperCase(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        MemberDetails memberDetails = (MemberDetails) authentication.getPrincipal();

        List<String> roles = memberDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt, memberDetails.getSid().toUpperCase(), memberDetails.getEmail(), memberDetails.getNickname(), roles));
    }



    // 버튼(인증번호 발송, 닉네임 중복 확인) 눌렀을 때 처리
    @GetMapping("/signup/create")
    public ResponseEntity<?> sendEmail(@RequestParam String request, @Valid @RequestParam(required = false) String email, @RequestParam(required = false) String nickname, Model model) throws Exception {
        if (memberRepository.existsByEmail(email)) {
            System.out.println("이미 가입한 이메일");
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("이미 가입된 이메일입니다"));
        }
        if (request.equals("send_email")) {
            String certification = emailService.sendSignSimpleMesesage(email);
            model.addAttribute("certification", certification);
            return ResponseEntity.ok().body(certification);
        }

        if (request.equals("check_nickname")) {
            if (memberRepository.existsByNickname(nickname)) {
                System.out.println("중복 닉네임");
                return ResponseEntity.badRequest()
                        .body(new MessageResponse("이미 가입된 닉네임입니다."));
            } else {
                return ResponseEntity.ok(new MessageResponse("사용할 수 있는 닉네임입니다."));
            }
        }

        return null;
    }

    // 회원가입 버튼 눌렀을 때 처리
    @PostMapping("/signup/create")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {

        System.out.println("회원가입 시도");
        // 이미 가입한 학번인 경우
        if (memberRepository.existsBySid(signupRequest.getSid().toUpperCase())) {
            System.out.println(memberRepository.existsBySid(signupRequest.getSid().toUpperCase()));
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: 이미 가입한 학번입니다."));
        }

        // 회원 생성
        Member member = new Member(signupRequest.getSid().toUpperCase(), signupRequest.getEmail(), passwordEncoder.encode(signupRequest.getPassword()), signupRequest.getNickname(), signupRequest.getMajor(), signupRequest.getDoubleMajor());
        Set<String> strRoles = signupRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.MEMBER)
                    .orElseThrow(() -> new RuntimeException("Error : Role is not found."));
            roles.add(userRole);
        }
        member.setRoles(roles);
        memberRepository.save(member);
        System.out.println("memberRepository.save(member)");

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
