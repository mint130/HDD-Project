package com.HDD.recruitment.controller;

import com.HDD.common.Pair;
import com.HDD.management.webDto.MessageResponse;
import com.HDD.recruitment.bookmark.service.BookmarkService;
import com.HDD.recruitment.comment.model.Comment;
import com.HDD.recruitment.comment.service.CommentService;
import com.HDD.recruitment.model.ProjectBoard;
import com.HDD.recruitment.service.FileService;
import com.HDD.recruitment.service.PJBoardService;
import com.HDD.recruitment.webDto.PJBoardRequest;
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
@RequestMapping("/recruitment/project")
@PreAuthorize("hasRole('MEMBER')")
public class PJBoardController {

    private final PJBoardService boardService;
    private final CommentService commentService;
    private final BookmarkService bookmarkService;
//    private final FileService fileService;

    @PostConstruct
    public void init(){
        commentService.setCollectionName("ProjectBoard");
    }

    @PostMapping(value = "/write", consumes = "multipart/form-data")
    public ResponseEntity<?> writeBoard(@AuthenticationPrincipal UserDetails userDetails, @RequestBody PJBoardRequest request, @RequestPart(required = false)MultipartFile file, @RequestBody(required = false) String fileName) throws Exception {
        ProjectBoard projectBoard = new ProjectBoard(userDetails.getUsername(), request);
        boardService.insertBoard(projectBoard, file, fileName);
        return ResponseEntity.ok(new MessageResponse("룸메이트 구인글이 등록되었습니다"));
    }


    @GetMapping()
    public ResponseEntity<?> boardList() throws Exception {
        List<Pair<ProjectBoard, String>> boardList = boardService.getBoardList();
        return ResponseEntity.ok(boardList);
    }

    @GetMapping("/{path}")
    public ResponseEntity<?> readBoard(@AuthenticationPrincipal UserDetails userDetails, @PathVariable String path, @RequestParam(required = false) String request) throws Exception {
        Pair<ProjectBoard, String> board = boardService.getBoard(path);
        List<Comment> commentList = commentService.getComments(path);
        boolean isBookmarked = false;
        if(bookmarkService.isBookmarkedP(userDetails.getUsername(), path)) isBookmarked = true;
        System.out.println("request = " + request);
        // 새로 클릭한 경우에만 DB 업데이트
        if (request != null && request.equals("bookmark")) {
            isBookmarked = !isBookmarked;
            if (isBookmarked) {
                System.out.println("북마크됨");
                bookmarkService.addProjectBookmark(userDetails.getUsername(), path);
            }
            else {
                System.out.println("북마크 해제");
                bookmarkService.removeProjectBookmark(userDetails.getUsername(), path);
            }
        }
        return ResponseEntity.ok(new Result(board, commentList, isBookmarked));
    }

    @GetMapping("/{path}/update")
    public ResponseEntity<?> updateBoard(@PathVariable String path) throws Exception {
        Pair<ProjectBoard, String> board = boardService.getBoard(path);
        return ResponseEntity.ok(board);
    }

    // 수정할 때 이미지 변경 어케하지?
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
        private Pair<ProjectBoard, String> board;
        private List<Comment> comment;
        private boolean bookmark;

        public Result(Pair<ProjectBoard, String> board, List<Comment> comment, boolean bookmark) {
            this.board = board;
            this.comment = comment;
            this.bookmark = bookmark;
        }
    }
}
