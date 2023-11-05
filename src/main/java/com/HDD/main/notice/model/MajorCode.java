package com.HDD.main.notice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

@Getter
@AllArgsConstructor
public enum MajorCode {
    MAIN("main", "", false),
    SCIENCE("기초과학과", "science", true),
    CIVIL("건설환경공학과", "civil", false),
    EE("전자전기공학부", "ee", true),
    CE("컴퓨터공학과", "wwwce", true),
    IE("산업데이터공학과", "ie", true),
    MSE("신소재공학전공", "mse",true),
    CHEMENG("화학공학전공", "chemeng",false),
    ME("기계시스템디자인공학과", "me",false),
    ARCH("건축학부", "arch", false),
    URBAN("도시공학과", "urban", false),
    BIZADMIN("경영학전공", "bizadmin", true),
    ENGLISH("영어영문학과", "english",true),
    GERMAN("독어독문학과", "german", true),
    FRANCE("불어불문학과", "france", true),
    HKOREAN("국어국문학과", "hkorean", true),
    LAW("법학부", "law", true),
    MATH("수학교육과", "math", true),
    KOREDU("국어교육과", "koredu", true),
    ENGEDU("영어교육과", "engedu", true),
    HISEDU("역사교육과", "hisedu", true),
    EDU("교육학과", "edu", true),
    ORIP("동양화과", "orip", true),
    PAINTING("회화과", "painting", true),
    PRINGMK("판화과", "printmk", true),
    SCU("조소과", "scu", true),
    WAF("목조형가구학과", "waf", true),
    ART("예술학과", "art", true),
    METALART("금속조형디자인과", "metalart", true),
    CER("도예유리과", "cer", false),
    TAFD("섬유미술패션디자인과", "tafd", false),
    SIDI("시각디자인전공", "sidi", false),
    ID("산업디자인전공", "id", true),
    ECONOMICS("경제학전공", "economics", true),
    MUSICAL("뮤지컬전공", "musical", true),
    MUSIC("실용음악전공", "music", true),
    IIM("디자인경영융합부","iim",  true),
    FM("캠퍼스자율전공", "fm", true);

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
