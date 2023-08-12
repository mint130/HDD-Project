package com.HDD.recruitment.comment.model;

import com.HDD.recruitment.comment.webDto.CommentRequest;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class Comment {
    private String commentId;   // 해당 댓글 id
    private String parentId;    // 원댓인 경우 comment id, 답글인 경우 원댓 id
    @NotEmpty
    private String boardId;
    @NotEmpty
    private String memberId;
    @NotEmpty
    private String content;
    @NotEmpty
    private Date created;

    public Comment(String memberId, String boardId, CommentRequest request) {
        this.memberId = memberId;
        this.boardId = boardId;
        this.content = request.getContent();
        this.created = new Date(System.currentTimeMillis());
    }

}
