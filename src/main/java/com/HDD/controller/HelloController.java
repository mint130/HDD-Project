package com.HDD.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
public class HelloController {

    @GetMapping("/test")
    public String time(){
        return "안녕하세요. 현재 시간은 " + new Date() + "입니다";
    }
}
