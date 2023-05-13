package com.HDD.token;

import lombok.Getter;

import java.util.List;

@Getter
public class JwtResponse {
    private String token;
    private Long id;
    private String sid;
    private String email;
    private String nickname;
    private List<String> roles;

    public JwtResponse(String token, Long id, String sid, String email, String nickname, List<String> roles) {
        this.token = token;
        this.id = id;
        this.sid = sid;
        this.email = email;
        this.nickname = nickname;
        this.roles = roles;
    }
}
