package com.HDD.recruitment.controller;

import com.HDD.management.webDto.MessageResponse;
import com.HDD.recruitment.model.RoommateBoard;
import com.HDD.recruitment.service.FileService;
import com.HDD.recruitment.service.RMBoardService;
import com.HDD.recruitment.webDto.RMBoardRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/recruitment/roommate")
@PreAuthorize("hasRole('MEMBER')")
public class RMBoardController {

    private final RMBoardService boardService;
    private final FileService fileService;

    @PostMapping("/write")
    public ResponseEntity<?> writeBoard(@AuthenticationPrincipal UserDetails userDetails, @RequestBody RMBoardRequest request, @RequestBody(required = false) MultipartFile file) throws Exception {
        RoommateBoard roommateBoard = new RoommateBoard(userDetails.getUsername(), request);
        if(!file.isEmpty()){
            fileService.uploadFiles(file, roommateBoard.getBoardId());
        }
        boardService.insertBoard(roommateBoard);

        return ResponseEntity.ok(new MessageResponse("룸메이트 구인글이 등록되었습니다"));
    }

    @GetMapping()
    public ResponseEntity<?> boardList(Model model) throws Exception {
        List<RoommateBoard> boardList = boardService.getBoardList();
        model.addAttribute("boardList", boardList);
        return ResponseEntity.ok(new MessageResponse("ok"));
    }

    @GetMapping(value = {"/{path}", "/{path}/update"})
    public ResponseEntity<?> readBoard(@PathVariable String path, Model model) throws Exception {
        RoommateBoard board = boardService.getBoard(path);
        model.addAttribute("board", board);
        return ResponseEntity.ok(new MessageResponse("ok"));
    }

    @PostMapping("/{path}/update")
    public ResponseEntity<?> updateBoard(@PathVariable String path, @RequestBody RMBoardRequest request, Model model) throws Exception {
        RoommateBoard board = new RoommateBoard(path, request);
        boardService.updateBoard(board, path);
        return ResponseEntity.ok(new MessageResponse("수정되었습니다"));
    }

    @GetMapping("/{path}/delete")
    public ResponseEntity<?> deleteBoard(@PathVariable String path) throws Exception {
        boardService.deleteBoard(path);
        return ResponseEntity.ok(new MessageResponse("삭제되었습니다"));
    }
}
