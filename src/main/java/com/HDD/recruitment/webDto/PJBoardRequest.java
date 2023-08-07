package com.HDD.recruitment.webDto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class PJBoardRequest {
    private String title;
    private String major;
    private int num;
    private Date startDay;
    private Date finishDay;
    private int grade;   // 1, 2, 3, 4, 0(기타 학년)
    private String info;
    private String openChat;

}
