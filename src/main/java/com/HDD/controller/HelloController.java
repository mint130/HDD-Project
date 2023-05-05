package com.HDD.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @RequestMapping("home")
    public String home() {
        return "스프링부트 서버로부터 리턴, 홈";
    }

    @RequestMapping("about")
    public String about() {
        return "스프링부트 서버로부터 리턴, 어바웃";
    }

}