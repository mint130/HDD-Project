package com.HDD.recruitment.bookmark.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class Bookmark {
    String memberId;
    List<String> projectBoardId;
    List<String> roommateBoardId;

    public void addProjectBookmark(String boardId) {
        projectBoardId.add(boardId);
    }

    public void addRoommateBookmark(String boardId) {
        roommateBoardId.add(boardId);
    }
}
