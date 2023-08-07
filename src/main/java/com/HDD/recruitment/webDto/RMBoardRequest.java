package com.HDD.recruitment.webDto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
public class RMBoardRequest {
    private String sex; // M, F
    private int grade;  // 1, 2, 3, 4, 0(기타 학년)
    private int dormType;   // 1, 2, 3, 0(상관없음? 외부?)
    private boolean korean;
    private boolean smoke;
    private String pattern; // 생활 패턴
    private String info;    // 기타 쓰는거
    private String openChat;
}
