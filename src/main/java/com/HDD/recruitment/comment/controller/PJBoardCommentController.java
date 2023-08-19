package com.HDD.recruitment.comment.controller;

import com.HDD.management.security.MemberDetails;
import com.HDD.management.webDto.MessageResponse;
import com.HDD.recruitment.comment.model.Comment;
import com.HDD.recruitment.comment.service.CommentService;
import com.HDD.recruitment.comment.webDto.CommentRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/recruitment/project/{boardId}")
@PreAuthorize("hasRole('MEMBER')")
public class PJBoardCommentController{

    private final CommentService commentService;

    @PostConstruct
    public void init(){
        commentService.setCollectionName("ProjectBoard");
    }

    @PostMapping("/comment")
    public ResponseEntity<?> writeComment(@AuthenticationPrincipal MemberDetails userDetails, @PathVariable String boardId, @RequestBody CommentRequest request) throws Exception {
        Comment comment = new Comment(userDetails.getNickname(), boardId, request);
        commentService.insertComment(boardId, null, comment);
        return ResponseEntity.ok(new MessageResponse("댓글이 등록되었습니다"));
    }

    @PostMapping("/comment/{commentId}")
    public ResponseEntity<?> writeReply(@AuthenticationPrincipal MemberDetails userDetails, @PathVariable String boardId, @PathVariable String commentId, @RequestBody CommentRequest request) throws Exception {
        Comment comment = new Comment(userDetails.getNickname(), boardId, request);
        commentService.insertComment(boardId, commentId, comment);
        return ResponseEntity.ok(new MessageResponse("댓글이 등록되었습니다"));
    }

    @GetMapping("/{commentId}/delete")
    public ResponseEntity<?> deleteComment(@PathVariable String boardId, @PathVariable String commentId) throws Exception {
        commentService.deleteComment(boardId, commentId);
        return ResponseEntity.ok(new MessageResponse("댓글이 삭제되었습니다"));
    }
}
