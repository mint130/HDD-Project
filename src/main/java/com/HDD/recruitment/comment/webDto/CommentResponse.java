package com.HDD.recruitment.comment.webDto;

import lombok.Getter;

import java.util.Date;

@Getter
public class CommentResponse {
    private String commentId;   // 이걸로 답글처리해야할텐데
    private int profile;        // 회원 프로필 이미지 번호..
    private String nickname;
    private Date created;
    private String content;
}
