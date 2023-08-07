package com.HDD.recruitment.service;

import com.HDD.recruitment.model.RoommateBoard;

import java.util.List;

public interface RMBoardService {
    public String insertBoard(RoommateBoard board) throws Exception;

    public RoommateBoard getBoard(String id) throws Exception;

    public List<RoommateBoard> getBoardList() throws Exception;

    public String updateBoard(RoommateBoard board, String id) throws Exception;

    public String deleteBoard(String id) throws Exception;
}
