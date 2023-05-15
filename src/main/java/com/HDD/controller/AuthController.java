package com.HDD.controller;

import com.HDD.model.ERole;
import com.HDD.model.Member;
import com.HDD.model.Role;
import com.HDD.repository.MemberRepository;
import com.HDD.repository.RoleRepository;
import com.HDD.security.MemberDetails;
import com.HDD.service.EmailService;
import com.HDD.token.JwtResponse;
import com.HDD.token.JwtUtils;
import com.HDD.webDto.LoginRequest;
import com.HDD.webDto.MessageResponse;
import com.HDD.webDto.SignupRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
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
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getSid(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        MemberDetails memberDetails = (MemberDetails) authentication.getPrincipal();

        List<String> roles = memberDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt, memberDetails.getSid(), memberDetails.getEmail(), memberDetails.getNickname(), roles));
    }
    
    
    // 인증번호 발송 버튼 눌렀을 때 처리
    @GetMapping("/signup/create")
    public String sendEmail(@RequestParam boolean sendEmail, @Valid @RequestParam String email, Model model) throws Exception {
        String certification = emailService.sendSimpleMessage(email);
        model.addAttribute("certification", certification);
        return certification;
    }

    // 회원가입 버튼 눌렀을 때 처리
    @PostMapping("/signup/create")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        System.out.println("회원가입 시도");
        // 이미 가입한 학번인 경우
        if (memberRepository.existsBySid(signupRequest.getSid())) {
            System.out.println(memberRepository.existsBySid(signupRequest.getSid()));
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: 이미 가입한 학번입니다."));
        }

        // 회원 생성
        Member member = new Member(signupRequest.getSid(), signupRequest.getEmail(), passwordEncoder.encode(signupRequest.getPassword()), signupRequest.getNickname(), signupRequest.getMajor(), signupRequest.getDoubleMajor());
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
