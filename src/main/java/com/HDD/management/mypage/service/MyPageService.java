package com.HDD.management.mypage.service;

import com.HDD.common.Pair;
import com.HDD.management.model.Member;
import com.HDD.management.repository.MemberRepository;
import com.HDD.recruitment.bookmark.model.Bookmark;
import com.HDD.recruitment.model.ProjectBoard;
import com.HDD.recruitment.model.RoommateBoard;
import com.HDD.recruitment.service.FileService;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.*;

/*
 * 1. 북마크한 글 - 플젝, 룸메
 * 2. 작성한 글 - 플젝, 룸메
 * 3. 프로필 변경(비밀번호)
 */
@Service
public class MyPageService {
    private final static String PROJECT_COLLECTION = "ProjectBoard";
    private final static String ROOMMATE_COLLECTION = "RoommateBoard";
    private final static String BOOKMARK_COLLECTION = "Bookmark";
    private Firestore firestore = FirestoreClient.getFirestore();
    private final FileService fileService;
    private final MemberRepository memberRepository;

    public MyPageService(FileService fileService, MemberRepository memberRepository) {
        this.fileService = fileService;
        this.memberRepository = memberRepository;
    }

    // 내가 쓴 프로젝트 구인 글
    public List<Pair<ProjectBoard, String>> getProjectBoards(String id) throws Exception {
        List<Pair<ProjectBoard, String>> list = new ArrayList<>();
        ApiFuture<QuerySnapshot> apiFuture
                = firestore.collection(PROJECT_COLLECTION).whereEqualTo("memberId", id).get();
        List<QueryDocumentSnapshot> documentSnapshots = apiFuture.get().getDocuments();

        for (QueryDocumentSnapshot snapshot : documentSnapshots) {
            ProjectBoard board = snapshot.toObject(ProjectBoard.class);
            String imageUrl = null;
            if (board.getImageName() != null) {
                imageUrl = fileService.getImageUrl(board.getImageName());
            }
            list.add(new Pair<>(board, imageUrl));
        }
        list.sort((Pair<ProjectBoard, String> p1, Pair<ProjectBoard, String> p2) -> {
            if(p1.getFirst().getCreated().after(p2.getFirst().getCreated()))
                return 1;
            else return -1;
        });
        return list;
    }

    // 내가 쓴 룸메이트 구인 글
    public List<Pair<RoommateBoard, String>> getRoommateBoards(String id) throws Exception {
        List<Pair<RoommateBoard, String>> list = new ArrayList<>();
        ApiFuture<QuerySnapshot> apiFuture
                = firestore.collection(ROOMMATE_COLLECTION).whereEqualTo("memberId", id).get();
        List<QueryDocumentSnapshot> documentSnapshots = apiFuture.get().getDocuments();

        for (QueryDocumentSnapshot snapshot : documentSnapshots) {
            RoommateBoard board = snapshot.toObject(RoommateBoard.class);
            String imageUrl = null;
            if (board.getImageName() != null) {
                imageUrl = fileService.getImageUrl(board.getImageName());
            }
            list.add(new Pair<>(board, imageUrl));
        }
        list.sort((Pair<RoommateBoard, String> p1, Pair<RoommateBoard, String> p2) -> {
            if(p1.getFirst().getCreated().after(p2.getFirst().getCreated()))
                return 1;
            else return -1;
        });
        return list;
    }

    // 내가 북마크한 프로젝트 구인 글
    public List<Pair<ProjectBoard, String>> getProjectBookmarks(String memberId) throws Exception{
        List<Pair<ProjectBoard, String>> list = new ArrayList<>();
        CollectionReference collectionReference = firestore.collection(BOOKMARK_COLLECTION);
        ApiFuture<DocumentSnapshot> apiFuture
                = collectionReference.document(memberId).get();
        DocumentSnapshot snapshot = apiFuture.get();
        Bookmark bookmark = null;

        if (snapshot.exists()) {
            CollectionReference projectCollection = firestore.collection(PROJECT_COLLECTION);
            bookmark = snapshot.toObject(Bookmark.class);
            List<String> boardId = bookmark.getProjectBoardId();

            for(String id : boardId) {
                ApiFuture<DocumentSnapshot> boardApi
                        = projectCollection.document(id).get();
                DocumentSnapshot documentSnapshot = boardApi.get();
                list.add(new Pair<>(documentSnapshot.toObject(ProjectBoard.class), null));
            }
            list.sort((Pair<ProjectBoard, String> p1, Pair<ProjectBoard, String> p2) -> {
                if(p1.getFirst().getCreated().after(p2.getFirst().getCreated()))
                    return -1;
                else return 1;
            });
            return list;
        } else return null;
    }

    public List<Pair<RoommateBoard,String>> getRoommateBookmarks(String memberId) throws Exception{
        List<Pair<RoommateBoard, String>> list = new ArrayList<>();
        CollectionReference collectionReference = firestore.collection(BOOKMARK_COLLECTION);
        ApiFuture<DocumentSnapshot> apiFuture
                = collectionReference.document(memberId).get();
        DocumentSnapshot snapshot = apiFuture.get();
        Bookmark bookmark = null;

        if (snapshot.exists()) {
            CollectionReference roommateCollection = firestore.collection(ROOMMATE_COLLECTION);
            bookmark = snapshot.toObject(Bookmark.class);
            List<String> boardId = bookmark.getRoommateBoardId();

            for(String id : boardId) {
                ApiFuture<DocumentSnapshot> boardApi
                        = roommateCollection.document(id).get();
                DocumentSnapshot documentSnapshot = boardApi.get();
                list.add(new Pair<>(documentSnapshot.toObject(RoommateBoard.class), null));
            }
            list.sort((Pair<RoommateBoard, String> p1, Pair<RoommateBoard, String> p2) -> {
                if(p1.getFirst().getCreated().after(p2.getFirst().getCreated()))
                    return -1;
                else return 1;
            });
            return list;
        } else return null;
    }

    // 프로필 변경
    public Member updateInfo(String memberId) {
        return null;
    }
}
