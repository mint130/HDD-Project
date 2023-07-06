package com.HDD.main.notice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

@Getter
@AllArgsConstructor
public enum MajorCode {
    Main("", "3"),  // 홈페이지
    CE("ce", "54"),
    EE("ee", "76"); // 전전

    private String major;
    private String code;

     public static MajorCode getMajorCode(String major) {
         return Arrays.stream(MajorCode.values())
                 .filter(v -> v.major.equals(major))
                 .findAny()
                 .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 학과 코드입니다"));
     }

     public static String getECode(String major){
         return getMajorCode(major).getCode();
     }
}
