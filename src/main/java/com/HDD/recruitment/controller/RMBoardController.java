package com.HDD.recruitment.controller;

import com.HDD.management.webDto.MessageResponse;
import com.HDD.recruitment.comment.model.Comment;
import com.HDD.recruitment.comment.service.CommentService;
import com.HDD.recruitment.model.RoommateBoard;
import com.HDD.recruitment.service.FileService;
import com.HDD.recruitment.service.RMBoardService;
import com.HDD.recruitment.webDto.RMBoardRequest;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/recruitment/roommate")
@PreAuthorize("hasRole('MEMBER')")
public class RMBoardController {

    private final RMBoardService boardService;
    private final FileService fileService;
    private final CommentService commentService;

    @PostConstruct
    public void init(){
        commentService.setCollectionName("RoommateBoard");
    }

    @PostMapping("/write")
    public ResponseEntity<?> writeBoard(@AuthenticationPrincipal UserDetails userDetails, @RequestBody RMBoardRequest request, @RequestBody(required = false) MultipartFile file) throws Exception {
        RoommateBoard roommateBoard = new RoommateBoard(userDetails.getUsername(), request);
        if(file != null){
            fileService.uploadFiles(file, roommateBoard.getBoardId());
        }
        boardService.insertBoard(roommateBoard);

        return ResponseEntity.ok(new MessageResponse("룸메이트 구인글이 등록되었습니다"));
    }

    @GetMapping()
    public ResponseEntity<?> boardList() throws Exception {
        List<RoommateBoard> boardList = boardService.getBoardList();
        for(RoommateBoard b : boardList){
            System.out.println(b.getBoardId() + " " + b.getCreated());
        }
        return ResponseEntity.ok(boardList);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchBoard(@RequestParam(value = "sex", required = false) List<String> sex, @RequestParam(value = "dormType", required = false) List<Integer> dormType, @RequestParam(value = "smoke", required = false) List<Boolean> smoke) throws Exception {
        List<RoommateBoard> boardList = boardService.searchBoard(sex, dormType, smoke);
        return ResponseEntity.ok(boardList);
    }

    @GetMapping(value = {"/{path}", "/{path}/update"})
    public ResponseEntity<?> readBoard(@PathVariable String path) throws Exception {
        RoommateBoard board = boardService.getBoard(path);
        List<Comment> commentList = commentService.getComments(path);
        return ResponseEntity.ok(new Result(board, commentList));
    }

    @PostMapping("/{path}/update")
    public ResponseEntity<?> updateBoard(@PathVariable String path, @AuthenticationPrincipal UserDetails userDetails, @RequestBody RMBoardRequest request) throws Exception {
        RoommateBoard board = new RoommateBoard(userDetails.getUsername(), request);
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
        private RoommateBoard board;
        private List<Comment> comment;

        public Result(RoommateBoard board, List<Comment> comment) {
            this.board = board;
            this.comment = comment;
        }
    }
}