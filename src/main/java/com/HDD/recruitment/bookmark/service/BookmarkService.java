package com.HDD.recruitment.bookmark.service;

import com.HDD.recruitment.bookmark.model.Bookmark;
import com.HDD.recruitment.model.ProjectBoard;
import com.HDD.recruitment.model.RoommateBoard;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.checkerframework.checker.units.qual.C;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BookmarkService {
    private static final String COLLECTION_NAME = "Bookmark";
    private final Firestore firestore = FirestoreClient.getFirestore();

    // 프로젝트 북마크 추가
    public String addProjectBookmark(String memberId, String boardId) throws Exception{
        DocumentReference documentReference
                = firestore.collection(COLLECTION_NAME).document(memberId);
        ApiFuture<DocumentSnapshot> apiFuture = documentReference.get();
        DocumentSnapshot snapshot = apiFuture.get();
        Bookmark bookmark = null;

        if(snapshot.exists()) {
            bookmark = snapshot.toObject(Bookmark.class);
            if (bookmark.getProjectBoardId() == null) {
                bookmark.setProjectBoardId(Arrays.asList(boardId));
            } else {
                bookmark.addProjectBookmark(boardId);
            }
            documentReference.set(bookmark);
            return "update";
        } else {
            bookmark = new Bookmark();
            bookmark.setMemberId(memberId);
            bookmark.setProjectBoardId(Arrays.asList(boardId));
            documentReference.set(bookmark);
            return "add";
        }
    }

    // 룸메이트 북마크 추가
    public String addRoommateBookmark(String memberId, String boardId) throws Exception {
        DocumentReference documentReference
                = firestore.collection(COLLECTION_NAME).document(memberId);
        ApiFuture<DocumentSnapshot> apiFuture = documentReference.get();
        DocumentSnapshot snapshot = apiFuture.get();
        Bookmark bookmark = null;

        if(snapshot.exists()) {
            bookmark = snapshot.toObject(Bookmark.class);
            if(bookmark.getRoommateBoardId() == null) {
                bookmark.setRoommateBoardId(Arrays.asList(boardId));
            }
            else {
                bookmark.addRoommateBookmark(boardId);
            }
            documentReference.set(bookmark);
            return "update";
        } else {
            bookmark = new Bookmark();
            bookmark.setMemberId(memberId);
            bookmark.setRoommateBoardId(Arrays.asList(boardId));
            documentReference.set(bookmark);
            return "add";
        }
    }



    // 내가 북마크 한 글인지 확인 - 프로젝트
    public boolean isBookmarkedP(String memberId, String boardId) throws Exception {
        DocumentSnapshot snapshot
                = firestore.collection(COLLECTION_NAME).document(memberId).get().get();
        Bookmark bookmark = null;

        if (snapshot.exists()) {
            bookmark = snapshot.toObject(Bookmark.class);
            if (bookmark.getProjectBoardId() != null && bookmark.getProjectBoardId().contains(boardId)) {
                return true;
            }
        }
        return false;
    }

    // 내가 북마크 한 글인지 확인 - 프로젝트
    public boolean isBookmarkedR(String memberId, String boardId) throws Exception {
        DocumentSnapshot snapshot
                = firestore.collection(COLLECTION_NAME).document(memberId).get().get();
        Bookmark bookmark = null;

        if (snapshot.exists()) {
            bookmark = snapshot.toObject(Bookmark.class);
            if ((bookmark.getRoommateBoardId() != null && bookmark.getRoommateBoardId().contains(boardId))) {
                return true;
            }
        }
        return false;
    }

    public String removeProjectBookmark(String memberId, String boardId) throws Exception {
        DocumentReference documentReference
                = firestore.collection(COLLECTION_NAME).document(memberId);
        DocumentSnapshot snapshot
                = documentReference.get().get();
        Bookmark bookmark = snapshot.toObject(Bookmark.class);
        bookmark.getProjectBoardId().remove(boardId);
        documentReference.set(bookmark);
        return "remove";
    }

    public String removeRoommateBookmark(String memberId, String boardId) throws Exception {
        DocumentReference documentReference
                = firestore.collection(COLLECTION_NAME).document(memberId);
        DocumentSnapshot snapshot
                = documentReference.get().get();
        Bookmark bookmark = snapshot.toObject(Bookmark.class);
        bookmark.getRoommateBoardId().remove(boardId);
        documentReference.set(bookmark);
        return "remove";
    }
}
