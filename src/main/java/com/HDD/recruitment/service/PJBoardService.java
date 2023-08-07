package com.HDD.recruitment.service;

import com.HDD.recruitment.model.ProjectBoard;

import java.util.List;

public interface PJBoardService {
    public String insertBoard(ProjectBoard board) throws Exception;

    public ProjectBoard getBoard(String id) throws Exception;

    public List<ProjectBoard> getBoardList() throws Exception;

    public String updateBoard(ProjectBoard board, String id) throws Exception;

    public String deleteBoard(String id) throws Exception;
}
