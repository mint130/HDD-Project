package com.HDD.recruitment.service;

import com.HDD.recruitment.model.RoommateBoard;

import java.util.List;

public interface RMBoardService {
    public String insertRMBoard(RoommateBoard board) throws Exception;

    public RoommateBoard getRMBoard(String id) throws Exception;

    public List<RoommateBoard> getRMBoardList() throws Exception;

    public String updateRMBoard(RoommateBoard board, String id) throws Exception;

    public String deleteRMBoard(String id) throws Exception;
}
