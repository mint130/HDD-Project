package com.HDD.recruitment.service;

import com.HDD.recruitment.model.RoommateBoard;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RMBoardServiceImpl implements RMBoardService{
    public static final String COLLECTION_NAME = "RoommateBoard";

    @Override
    public String insertRMBoard(RoommateBoard board) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();
        // 이렇게 하면 document id가 값으로 저장되나?
        DocumentReference documentReference
                = firestore.collection(COLLECTION_NAME).document();
        board.setBoardId(documentReference.getId());
        ApiFuture<com.google.cloud.firestore.WriteResult> apiFuture
                = documentReference.set(board);

        return apiFuture.get().getUpdateTime().toString();
    }

    // 선택한 구인글 상세정보
    @Override
    public RoommateBoard getRMBoard(String id) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();
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
    public List<RoommateBoard> getRMBoardList() throws Exception {
        List<RoommateBoard> list = new ArrayList<>();
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> apiFuture = firestore.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> documentSnapshots = apiFuture.get().getDocuments();
        for(QueryDocumentSnapshot snapshot : documentSnapshots){
            list.add(snapshot.toObject(RoommateBoard.class));
        }
        return list;
    }

    @Override
    public String updateRMBoard(RoommateBoard board, String id) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<com.google.cloud.firestore.WriteResult> apiFuture
                = firestore.collection(COLLECTION_NAME).document(id).set(board);
        return apiFuture.get().getUpdateTime().toString();
    }

    @Override
    public String deleteRMBoard(String id) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> apiFuture = firestore.collection(COLLECTION_NAME).document().delete();
        return "Document " + id + "is deleted";
    }
}
