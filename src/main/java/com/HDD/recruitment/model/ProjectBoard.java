package com.HDD.recruitment.model;

import com.HDD.recruitment.webDto.PJBoardRequest;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class ProjectBoard {

    private String boardId;
    @NotEmpty
    private String memberId;
    @NotEmpty
    private String title;
    @NotEmpty
    private String major;
    @NotEmpty
    private int num;
    @NotEmpty
    private Date startDay;
    @NotEmpty
    private Date finishDay;
    @NotEmpty
    private int grade;
    private String info;
    @NotEmpty
    private String openChat;
    @NotEmpty
    private Date created;
    private boolean isRecruited = false;

    public ProjectBoard(String memberId, PJBoardRequest request) {
        this.memberId = memberId;
        this.title = request.getTitle();
        this.major = request.getMajor();
        this.num = request.getNum();
        this.startDay = request.getStartDay();
        this.finishDay = request.getFinishDay();
        this.grade = request.getGrade();
        this.info = request.getInfo();
        this.openChat = request.getOpenChat();
        this.created = new Date(System.currentTimeMillis());
    }
}
