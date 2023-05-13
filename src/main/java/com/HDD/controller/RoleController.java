package com.HDD.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class RoleController {

    @GetMapping("/all")
    public String allAccess() {
        return "메인 페이지";
    }

    @GetMapping("/member")
    @PreAuthorize("hasRole('MEMBER') or hasRole('ADMIN')")
    public String memberAccess() {
        return "회원 페이지";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminAccess() {
        return "관리자 페이지";
    }
}
