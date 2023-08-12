package com.HDD.recruitment.service;

import com.HDD.recruitment.model.ProjectBoard;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class PJBoardServiceImpl implements PJBoardService{
    public static final String COLLECTION_NAME = "ProjectBoard";

    @Override
    public String insertBoard(ProjectBoard board) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference documentReference
                = firestore.collection(COLLECTION_NAME).document();
        board.setBoardId(documentReference.getId());
        ApiFuture<WriteResult> apiFuture
                = documentReference.set(board);

        return apiFuture.get().getUpdateTime().toString();
    }

    @Override
    public ProjectBoard getBoard(String id) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference documentReference
                = firestore.collection(COLLECTION_NAME).document(id);
        ApiFuture<DocumentSnapshot> apiFuture = documentReference.get();
        DocumentSnapshot snapshot = apiFuture.get();
        ProjectBoard board = null;

        if (snapshot.exists()) {
            board = snapshot.toObject(ProjectBoard.class);
            return board;
        } else {
            return null;
        }
    }

    @Override
    public List<ProjectBoard> getBoardList() throws Exception {
        List<ProjectBoard> list = new ArrayList<>();
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> apiFuture = firestore.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> documentSnapshots = apiFuture.get().getDocuments();
        for(QueryDocumentSnapshot snapshot : documentSnapshots){
            list.add(snapshot.toObject(ProjectBoard.class));
        }
        // 최근에 등록한 순으로 정렬
        list.sort(Comparator.comparing(ProjectBoard::getCreated).reversed());
        return list;
    }

    @Override
    public String updateBoard(ProjectBoard board, String id) throws Exception {
        board.setBoardId(id);
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> apiFuture
                = firestore.collection(COLLECTION_NAME).document(id).set(board);
        return apiFuture.get().getUpdateTime().toString();
    }

    @Override
    public String deleteBoard(String id) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> apiFuture = firestore.collection(COLLECTION_NAME).document(id).delete();
        return "Document " + id + "is deleted";
    }

    @Override
    public String closeBoard(String id) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> apiFuture = firestore.collection(COLLECTION_NAME).document(id).update("recruited", true);
        return "Document " + id + "is closed";
    }
}
