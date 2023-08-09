package com.HDD.main.notice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

@Getter
@AllArgsConstructor
public enum MajorCode {
    // 건환공, 화공, 기시디, 건축&실내건축, 도공, 섬패디, 시디
    Main("", "3"),      // 홈페이지
    CE("ce", "54"),     // 컴공
    IE("ie", "111"),    // 산공
    MSE("mse", "228"),  // 신소재
    EE("ee", "76"),     // 전전
    BZ("bz", "66"),     // 경영
    EN("en", "34"),     // 영문
    GM("gm", "36"),     // 독문
    FR("fr", "35"),     // 불문
    KR("kr", "246"),    // 국문
    LAW("law", "60"),   // 법
    MED("med", "43"),   // 수교
    KED("ked", "45"),   // 국교
    EED("eed", "47"),   // 영교
    HED("hed", "44"),   // 역교
    EDU("edu", "46"),   // 교육
    OR("or", "37"),     // 동양화
    PT("pt", "59"),     // 회화
    PM("pm", "56"),     // 판화
    SC("sc", "38"),     // 조소
    WA("wa", "42"),     // 목조
    ART("art", "39"),   // 예술
    MT("mt", "55"),     // 금속
    CER("cer", "41"),   // 도예
    ID("id", "58"),     //  산디
    ECO("eco", "207"),  // 경제
    MSC("msc", "172"),  // 뮤지컬
    MU("mu", "176"),    // 실음
    IIM("iim", "199"),  // 디경융
    FM("fm", "109");    // 자전

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
