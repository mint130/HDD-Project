package com.HDD.recruitment.comment.controller;

import com.HDD.recruitment.comment.service.CommentService;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/recruitment/project")
public class PJBoardCommentController extends CommentController {

    public PJBoardCommentController(CommentService commentService) {
        super(commentService);
        commentService.setCollectionName("ProjectBoard");
    }
}
