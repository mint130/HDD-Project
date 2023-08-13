package com.HDD.recruitment.controller;

import com.HDD.management.webDto.MessageResponse;
import com.HDD.recruitment.comment.model.Comment;
import com.HDD.recruitment.comment.service.CommentService;
import com.HDD.recruitment.model.ProjectBoard;
import com.HDD.recruitment.service.PJBoardService;
import com.HDD.recruitment.webDto.PJBoardRequest;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
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
@RequestMapping("/recruitment/project")
@PreAuthorize("hasRole('MEMBER')")
public class PJBoardController {

    private final PJBoardService boardService;
    private final CommentService commentService;

    @PostConstruct
    public void init(){
        commentService.setCollectionName("ProjectBoard");
    }

    @PostMapping("/write")
    public ResponseEntity<?> writeBoard(@AuthenticationPrincipal UserDetails userDetails, @RequestBody PJBoardRequest request, @RequestBody(required = false) String imgUrl) throws Exception {
        ProjectBoard projectBoard = new ProjectBoard(userDetails.getUsername(), request);
        boardService.insertBoard(projectBoard);
        return ResponseEntity.ok(new MessageResponse("룸메이트 구인글이 등록되었습니다"));
    }


    @GetMapping()
    public ResponseEntity<?> boardList() throws Exception {
        List<ProjectBoard> boardList = boardService.getBoardList();
        return ResponseEntity.ok(boardList);
    }

    @GetMapping(value = {"/{path}", "/{path}/update"})
    public ResponseEntity<?> readBoard(@PathVariable String path) throws Exception {
        ProjectBoard board = boardService.getBoard(path);
        List<Comment> commentList = commentService.getComments(path);
        return ResponseEntity.ok(new Result(board, commentList));
    }

    @PostMapping("/{path}/update")
    public ResponseEntity<?> updateBoard(@PathVariable String path, @AuthenticationPrincipal UserDetails userDetails, @RequestBody PJBoardRequest request) throws Exception {
        ProjectBoard board = new ProjectBoard(userDetails.getUsername(), request);
        boardService.updateBoard(board, path);
        return ResponseEntity.ok(new MessageResponse("수정되었습니다"));
    }

    @GetMapping("/{path}/delete")
    public ResponseEntity<?> deleteBoard(@PathVariable String path) throws Exception {
        boardService.deleteBoard(path);
        return ResponseEntity.ok(new MessageResponse("삭제되었습니다"));
    }

    @GetMapping("/{path}/close")
    public ResponseEntity<?> closeBoard(@PathVariable String path) throws Exception {
        boardService.closeBoard(path);
        return ResponseEntity.ok(new MessageResponse("마갑되었습니다"));
    }

    @Getter
    static class Result {
        private ProjectBoard board;
        private List<Comment> comment;

        public Result(ProjectBoard board, List<Comment> comment) {
            this.board = board;
            this.comment = comment;
        }
    }
}
