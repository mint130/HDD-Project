package com.HDD.recruitment.model;

import com.HDD.recruitment.webDto.RMBoardRequest;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;


@Getter
@Setter
@NoArgsConstructor
public class RoommateBoard {

    private String boardId;
    @NotEmpty private String memberId;
    @NotEmpty private String sex; // M, F
    @NotEmpty private int grade;  // 1, 2, 3, 4, 0
    @NotEmpty private int dormType;   // 1, 2, 3, 0
    @NotEmpty private boolean korean;
    @NotEmpty private boolean smoke;
    private String pattern;
    private String info;
    @NotEmpty private String openChat;
    @NotEmpty private Date created;
    private boolean isRecruited = false;
    private String imageName;

    public RoommateBoard(String memberId, RMBoardRequest request) {
        this.memberId = memberId;
        this.sex = request.getSex();
        this.grade = request.getGrade();
        this.dormType = request.getDormType();
        this.korean = request.isKorean();
        this.smoke = request.isSmoke();
        this.pattern = request.getPattern();
        this.info = request.getInfo();
        this.openChat = request.getOpenChat();
        this.created = new Date(System.currentTimeMillis());
    }
}
