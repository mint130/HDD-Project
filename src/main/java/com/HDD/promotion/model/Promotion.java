package com.HDD.promotion.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class Promotion {
    private String major;
    private String title;
    private Date start;
    private Date finish;
    private String hall;    // R동, T동 이런거
    private String etc;     // 기타(층 같은거)
    private String imageName;

    public Promotion(String major, String title, Date start, Date finish, String hall, String etc) {
        this.major = major;
        this.title = title;
        this.start = start;
        this.finish = finish;
        this.hall = hall;
        this.etc = etc;
    }
}
