package com.HDD.security;

import com.HDD.model.Member;
import com.HDD.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberDetailService implements UserDetailsService {

    private final MemberRepository memberRepository;
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String sid) throws UsernameNotFoundException {
        Member member = memberRepository.findBySid(sid)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with Sid: " + sid));

        return MemberDetails.build(member);
    }
}
