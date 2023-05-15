package com.HDD.security;

import com.HDD.model.Member;
import com.HDD.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberDetailService implements UserDetailsService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String sid) throws UsernameNotFoundException {
        Member member = memberRepository.findBySid(sid)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with Sid: " + sid));

        List<GrantedAuthority> authorities = member.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name()))
                .collect(Collectors.toList());

        return MemberDetails.build(member);
//        return MemberDetails.builder()
//                .sid(member.getSid())
//                .email(member.getEmail())
//                .password(passwordEncoder.encode(member.getPassword()))
//                .nickname(member.getNickname())
//                .authorities(authorities)
//                .build();

    }
}
