package com.HDD.loginTest;

import com.HDD.model.ERole;
import com.HDD.model.Member;
import com.HDD.model.Role;
import com.HDD.repository.MemberRepository;
import com.HDD.repository.RoleRepository;
import com.HDD.security.MemberDetails;
import com.HDD.token.JwtResponse;
import com.HDD.token.JwtUtils;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class LoginTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

//    @BeforeEach
//    public void signup() {
//        Member member = new Member("B111123", "aaaa@g.hongik.ac.kr", passwordEncoder.encode("asdf1234"), "asdf", "ce", null);
//        Set<Role> roles = new HashSet<>();
//        Optional<Role> userRole = roleRepository.findByName(ERole.MEMBER);
//        member.setRoles(roles);
//        memberRepository.save(member);
//    }

    @Test
    public void login() {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken("B111123", "asdf1234"));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        MemberDetails memberDetails = (MemberDetails) authentication.getPrincipal();
        System.out.println("memberDetails = " + memberDetails.toString());

        List<String> roles = memberDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        String url = "http://localhost:" + port + "/api/auth/signin";
        ResponseEntity<?> responseEntity = restTemplate.postForEntity(url, memberDetails, MemberDetails.class);

        System.out.println(ResponseEntity.ok(new JwtResponse(jwt, memberDetails.getSid(), memberDetails.getEmail(), memberDetails.getNickname(), roles)));
//        Assertions.assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }
}
