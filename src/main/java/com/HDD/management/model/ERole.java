package com.HDD.management.model;

import lombok.Getter;

@Getter
public enum ERole {
    MEMBER("1", "MEMBER"),
    ADMIN("2", "ADMIN");

    private String  id;
    private String role;

    ERole(String id, String role){
        this.id = id;
        this.role = role;
    }
}
