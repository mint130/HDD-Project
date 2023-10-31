package com.HDD.recruitment.service;

import com.HDD.common.Pair;
import com.HDD.recruitment.model.RoommateBoard;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
public class RMBoardService {
    public static final String COLLECTION_NAME = "RoommateBoard";
    private Firestore firestore = FirestoreClient.getFirestore();
    private final FileService fileService;

    public RMBoardService(FileService fileService) {
        this.fileService = fileService;
    }

    public String insertBoard(RoommateBoard board, MultipartFile file, String nameFile) throws Exception {

        DocumentReference documentReference
                = firestore.collection(COLLECTION_NAME).document();
        board.setBoardId(documentReference.getId());
        ApiFuture<com.google.cloud.firestore.WriteResult> apiFuture
                = documentReference.set(board);
        if (file != null) {
            fileService.uploadFiles(file, nameFile);
            board.setImageName(nameFile);
        }
        return apiFuture.get().getUpdateTime().toString();
    }

    // 선택한 구인글 상세정보
    public Pair<RoommateBoard, String> getBoard(String id) throws Exception {
        DocumentReference documentReference
                = firestore.collection(COLLECTION_NAME).document(id);
        ApiFuture<DocumentSnapshot> apiFuture = documentReference.get();
        DocumentSnapshot snapshot = apiFuture.get();
        RoommateBoard board = null;

        if (snapshot.exists()) {
            board = snapshot.toObject(RoommateBoard.class);
            String imageUrl = null;
            if (board.getImageName() != null) {
                imageUrl = fileService.getImageUrl(board.getImageName());
            }
            return new Pair<>(board, imageUrl);
        } else {
            return null;
        }
    }

    // 구인글 목록
    public List<Pair<RoommateBoard, String>> getBoardList() throws Exception {
        List<Pair<RoommateBoard, String>> list = new ArrayList<>();
        ApiFuture<QuerySnapshot> apiFuture = firestore.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> documentSnapshots = apiFuture.get().getDocuments();

        for(QueryDocumentSnapshot snapshot : documentSnapshots){
            RoommateBoard board = snapshot.toObject(RoommateBoard.class);
            String imageUrl = null;
            if(board.getImageName() != null) {
                imageUrl = fileService.getImageUrl(board.getImageName());
            }
            list.add(new Pair<>(board, imageUrl));
        }
        // 최근에 등록한 순으로 정렬
        list.sort((Pair<RoommateBoard, String> p1, Pair<RoommateBoard, String> p2) -> {
            if(p1.getFirst().getCreated().after(p2.getFirst().getCreated()))
                return 1;
            else return -1;
        });
        return list;
    }

    public String updateBoard(RoommateBoard board, String id) throws Exception {
        board.setBoardId(id);
        ApiFuture<WriteResult> apiFuture
                = firestore.collection(COLLECTION_NAME).document(id).set(board);
        return apiFuture.get().getUpdateTime().toString();
    }

    public String deleteBoard(String id) throws Exception {
        ApiFuture<DocumentSnapshot> apiFuture = firestore.collection(COLLECTION_NAME).document(id).get();
        String image = apiFuture.get().getString("imageName");
        if(image != null) {
            fileService.deleteFile(image);
        }
        firestore.collection(COLLECTION_NAME).document(id).delete();
        return "Document " + id + "is deleted";
    }

    public String closeBoard(String id) throws Exception {
        ApiFuture<WriteResult> apiFuture = firestore.collection(COLLECTION_NAME).document(id).update("recruited", true);
        return "Document " + id + "is closed";
    }

    public List<Pair<RoommateBoard, String>> searchBoard(List<String> sex, List<Integer> dormType, List<Boolean> smoke) throws Exception {
        List<Pair<RoommateBoard, String>> list = new ArrayList<>();
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
            RoommateBoard board = snapshot.toObject(RoommateBoard.class);
            String imageUrl = null;
            if(board.getImageName() != null) {
                imageUrl = fileService.getImageUrl(board.getImageName());
            }
            list.add(new Pair<>(board, imageUrl));
        }
        return list;
    }
}
