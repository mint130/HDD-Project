package com.HDD.recruitment.controller;

import com.HDD.management.util.SecurityUtil;
import com.HDD.management.webDto.MessageResponse;
import com.HDD.recruitment.model.RoommateBoard;
import com.HDD.recruitment.service.RMBoardService;
import com.HDD.recruitment.webDto.RMBoardRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/recruitment/roommate")
public class RMBoardController {

    private final RMBoardService rmBoardService;

    @PostMapping("/write")
    public ResponseEntity<?> writeBoard(@RequestBody RMBoardRequest request, @RequestBody(required = false) String imgUrl) throws Exception {
        RoommateBoard roommateBoard = new RoommateBoard(SecurityUtil.getLoginUserName(), request);
        rmBoardService.insertRMBoard(roommateBoard);
        return ResponseEntity.ok(new MessageResponse("룸메이트 구인글이 등록되었습니다"));
    }

    @GetMapping()
    public ResponseEntity<?> boardList(Model model) throws Exception {
        List<RoommateBoard> boardList = rmBoardService.getRMBoardList();
        model.addAttribute("boardList", boardList);
        return ResponseEntity.ok(new MessageResponse("ok"));
    }

    @GetMapping(value = {"/{path}", "/{path}/update"})
    public ResponseEntity<?> readBoard(@PathVariable String path, Model model) throws Exception {
        RoommateBoard board = rmBoardService.getRMBoard(path);
        model.addAttribute("board", board);
        return ResponseEntity.ok(new MessageResponse("ok"));
    }

    @PostMapping("/{path}/update")
    public ResponseEntity<?> updateBoard(@PathVariable String path, @RequestBody RMBoardRequest request, Model model) throws Exception {
        RoommateBoard board = new RoommateBoard(path, request);
        rmBoardService.updateRMBoard(board, path);
        return ResponseEntity.ok(new MessageResponse("수정되었습니다"));
    }

    @GetMapping("/{path}/delete")
    public ResponseEntity<?> deleteBoard(@PathVariable String path) throws Exception {
        rmBoardService.deleteRMBoard(path);
        return ResponseEntity.ok(new MessageResponse("삭제되었습니다"));
    }
}
