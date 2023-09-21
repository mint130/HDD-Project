package com.HDD.promotion.model;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class Promotion {
    private String major;
    private String title;
    private Date start;
    private Date finish;
    private String hall;    // R동, T동 이런거

    public Promotion(String major, String title, Date start, Date finish, String hall) {
        this.major = major;
        this.title = title;
        this.start = start;
        this.finish = finish;
        this.hall = hall;
    }
}
