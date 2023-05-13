package com.HDD.webDto;

import lombok.Getter;
import org.springframework.stereotype.Service;

import java.util.Set;

@Getter
@Service
public class SignupRequest {
    private String sid;
    private String password;
    private String passwordCheck;
    private String email;
    private boolean emailVerified;
    private String nickname;
    private String major;
    private String doubleMajor;
    private Set<String> role = null;

}
