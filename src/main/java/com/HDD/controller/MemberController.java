package com.HDD.controller;

import com.HDD.model.Member;
import com.HDD.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1")
public class MemberController {

    private final MemberRepository memberRepository;

    @GetMapping("/members")
    public List<Member> getAllMembers(){
        return memberRepository.findAll();
    }
}
