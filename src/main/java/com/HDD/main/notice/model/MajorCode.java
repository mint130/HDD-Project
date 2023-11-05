package com.HDD.main.notice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

@Getter
@AllArgsConstructor
public enum MajorCode {
    MAIN("main", "", false),                // 홈페이지
    SCIENCE("science", "science", true),    // 기초과학
    CIVIL("civil", "civil", false),         // 건설환경
    EE("ee", "ee", true),                   // 전자전기
    CE("컴퓨터공학과", "wwwce", true),         // 컴퓨터
    IE("ie", "ie", true),                   // 산업데이터
    MSE("mse", "mse",true),                 // 신소재
    CHEMENG("chemeng", "chemeng",false),    // 화학
    ME("me", "me",false),                   // 기계시스템디자인
    ARCH("arch", "arch", false),            // 건축학, 실내건축학
    URBAN("urban", "urban", false),         // 도시
    BIZADMIN("bizadmin", "bizadmin", true), // 경영
    ENGLISH("english", "english",true),     // 영어영문
    GERMAN("german", "german", true),       // 독어독문
    FRANCE("france", "france", true),       // 불어불문
    HKOREAN("hkorean", "hkorean", true),    // 국어국문
    LAW("law", "law", true),                // 법학
    MATH("math", "math", true),             // 수학교육
    KOREDU("koredu", "koredu", true),       // 국어교육
    ENGEDU("engedu", "engedu", true),       // 영어교육
    HISEDU("hisedu", "hisedu", true),       // 역사교육
    EDU("edu", "edu", true),                // 교육학
    ORIP("orip", "orip", true),             // 동양화
    PAINTING("painting", "painting", true), // 회화
    PRINGMK("printmk", "printmk", true),    // 판화
    SCU("scu", "scu", true),                // 조소
    WAF("waf", "waf", true),                // 목조형가구
    ART("art", "art", true),                // 예술
    METALART("metalart", "metalart", true), // 금속조형디자인
    CER("cer", "cer", false),               // 도예유리
    TAFD("tafd", "tafd", false),            // 섬유미술패션디자인
    SIDI("sidi", "sidi", false),            // 시각디자인
    ID("id", "id", true),                   // 산업디자인
    ECONOMICS("economics", "economics", true),// 경제학
    MUSICAL("musical", "musical", true),    // 뮤지컬
    MUSIC("music", "music", true),          // 실용음악
    IIM("iim","iim",  true),                // 디자인경영융합
    FM("fm", "fm", true);                   // 캠퍼스자전

    private String major;
    private String code;
    private boolean basic;

    private static MajorCode getMajorCode(String major) {
        return Arrays.stream(MajorCode.values())
                .filter(m -> m.major.equals(major))
                .findAny()
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 학과 코드입니다"));
    }

    public static boolean isBasic(String major) {
        return getMajorCode(major).getBasic();
    }

    public static String getCode(String major) {
        return getMajorCode(major).getCode();
    }

    private boolean getBasic() {
        return this.basic;
    }
}
