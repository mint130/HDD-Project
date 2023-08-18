package com.HDD.recruitment.service;

import com.HDD.recruitment.model.RoommateBoard;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RMBoardServiceImpl implements RMBoardService{
    public static final String COLLECTION_NAME = "RoommateBoard";
    private Firestore firestore = FirestoreClient.getFirestore();

    @Override
    public String insertBoard(RoommateBoard board) throws Exception {

        DocumentReference documentReference
                = firestore.collection(COLLECTION_NAME).document();
        board.setBoardId(documentReference.getId());
        ApiFuture<com.google.cloud.firestore.WriteResult> apiFuture
                = documentReference.set(board);

        return apiFuture.get().getUpdateTime().toString();
    }

    // 선택한 구인글 상세정보
    @Override
    public RoommateBoard getBoard(String id) throws Exception {
        DocumentReference documentReference
                = firestore.collection(COLLECTION_NAME).document(id);
        ApiFuture<DocumentSnapshot> apiFuture = documentReference.get();
        DocumentSnapshot snapshot = apiFuture.get();
        RoommateBoard board = null;

        if (snapshot.exists()) {
            board = snapshot.toObject(RoommateBoard.class);
            return board;
        } else {
            return null;
        }
    }

    // 구인글 목록
    @Override
    public List<RoommateBoard> getBoardList() throws Exception {
        List<RoommateBoard> list = new ArrayList<>();
        ApiFuture<QuerySnapshot> apiFuture = firestore.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> documentSnapshots = apiFuture.get().getDocuments();

        for(QueryDocumentSnapshot snapshot : documentSnapshots){
            list.add(snapshot.toObject(RoommateBoard.class));
        }
        // 최근에 등록한 순으로 정렬
        list.sort(Comparator.comparing(RoommateBoard::getCreated).reversed());
        return list;
    }

    @Override
    public String updateBoard(RoommateBoard board, String id) throws Exception {
        board.setBoardId(id);
        ApiFuture<WriteResult> apiFuture
                = firestore.collection(COLLECTION_NAME).document(id).set(board);
        return apiFuture.get().getUpdateTime().toString();
    }

    @Override
    public String deleteBoard(String id) throws Exception {
        ApiFuture<WriteResult> apiFuture = firestore.collection(COLLECTION_NAME).document(id).delete();
        return "Document " + id + "is deleted";
    }

    @Override
    public String closeBoard(String id) throws Exception {
        ApiFuture<WriteResult> apiFuture = firestore.collection(COLLECTION_NAME).document(id).update("recruited", true);
        return "Document " + id + "is closed";
    }

    @Override
    public List<RoommateBoard> searchBoard(List<String> sex, List<Integer> dormType, List<Boolean> smoke) throws Exception {
        List<RoommateBoard> list = new ArrayList<>();
        CollectionReference collectionReference = firestore.collection(COLLECTION_NAME);
        if (sex == null) {
            sex = Arrays.asList("M", "F");
        }
/*        if (grade == null) {
            grade = Arrays.asList(1, 2, 3, 4, 0);
        }*/
        if (dormType == null) {
            dormType = Arrays.asList(1, 2, 3, 0);
        }
        if (smoke == null) {
            smoke = Arrays.asList(true, false);
        }

        ApiFuture<QuerySnapshot> apiFuture = collectionReference
                .whereIn("sex", sex)
                .whereIn("dormType", dormType)
                .whereIn("smoke", smoke)
                .get();
        List<QueryDocumentSnapshot> documentSnapshots = apiFuture.get().getDocuments();

        for (QueryDocumentSnapshot snapshot : documentSnapshots) {
            list.add(snapshot.toObject(RoommateBoard.class));
        }
        return list;
    }
}
