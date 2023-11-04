package com.HDD.recruitment.service;

import com.HDD.common.Pair;
import com.HDD.recruitment.model.ProjectBoard;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
public class PJBoardService {
    public static final String COLLECTION_NAME = "ProjectBoard";
    private Firestore firestore = FirestoreClient.getFirestore();
    private final FileService fileService;

    public PJBoardService(FileService fileService) {
        this.fileService = fileService;
    }

    public String insertBoard(ProjectBoard board, MultipartFile file, String nameFile) throws Exception {
        DocumentReference documentReference
                = firestore.collection(COLLECTION_NAME).document();
        board.setBoardId(documentReference.getId());

        if(file != null) {
            fileService.uploadFiles(file, nameFile);
            board.setImageName(nameFile);
        }
        ApiFuture<WriteResult> apiFuture
                = documentReference.set(board);
        return apiFuture.get().getUpdateTime().toString();
    }

    public Pair<ProjectBoard, String> getBoard(String id) throws Exception {
        DocumentReference documentReference
                = firestore.collection(COLLECTION_NAME).document(id);
        ApiFuture<DocumentSnapshot> apiFuture = documentReference.get();
        DocumentSnapshot snapshot = apiFuture.get();
        ProjectBoard board = null;

        if (snapshot.exists()) {
            board = snapshot.toObject(ProjectBoard.class);
            String imageUrl = null;
            if(board.getImageName() != null) {
                imageUrl = fileService.getImageUrl(board.getImageName());
            }
            return new Pair<>(board, imageUrl);
        } else {
            return null;
        }
    }

    public Pair<ProjectBoard, MultipartFile> getUpdateBoard(String id) throws Exception {
        DocumentReference documentReference
                = firestore.collection(COLLECTION_NAME).document(id);
        ApiFuture<DocumentSnapshot> apiFuture = documentReference.get();
        DocumentSnapshot snapshot = apiFuture.get();
        ProjectBoard board = null;

        if (snapshot.exists()) {
            board = snapshot.toObject(ProjectBoard.class);
            MultipartFile multipartFile = null;
            if(board.getImageName() != null) {
                multipartFile = fileService.getFile(board.getImageName());
            }
            return new Pair<>(board, multipartFile);
        } else {
            return null;
        }
    }

    public List<Pair<ProjectBoard, String>> getBoardList() throws Exception {
        List<Pair<ProjectBoard, String>> list = new ArrayList<>();
        ApiFuture<QuerySnapshot> apiFuture = firestore.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> documentSnapshots = apiFuture.get().getDocuments();
        for(QueryDocumentSnapshot snapshot : documentSnapshots){
            ProjectBoard board = snapshot.toObject(ProjectBoard.class);
            String imageUrl = null;
            if(board.getImageName() != null) {
                imageUrl = fileService.getImageUrl(board.getImageName());
            }
            list.add(new Pair<>(board, imageUrl));

        }
        // 최근에 등록한 순으로 정렬
        list.sort((Pair<ProjectBoard, String> p1, Pair<ProjectBoard, String> p2) -> {
            if(p1.getFirst().getCreated().after(p2.getFirst().getCreated()))
                return -1;
            else return 1;
        });

        return list;
    }

    public String updateBoard(ProjectBoard board, String id) throws Exception {
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
}
