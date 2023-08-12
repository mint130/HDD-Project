package com.HDD.recruitment.comment.controller;


import com.HDD.recruitment.comment.service.CommentService;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/recruitment/roommate")
public class RMBoardCommentController extends CommentController {

    public RMBoardCommentController(CommentService commentService) {
        super(commentService);
        commentService.setCollectionName("RoommateBoard");
    }
}
