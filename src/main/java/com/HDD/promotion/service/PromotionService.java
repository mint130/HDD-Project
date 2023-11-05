package com.HDD.promotion.service;

import com.HDD.common.Pair;
import com.HDD.promotion.model.Promotion;
import com.HDD.recruitment.service.FileService;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
public class PromotionService {
    private static final String COLLECTION_NAME = "Promotion";
    private final Firestore firestore = FirestoreClient.getFirestore();
    private final FileService fileService;

    public PromotionService(FileService fileService) {
        this.fileService = fileService;
    }

    // 홍보 추가
    public String insertPromotion(Promotion promotion, MultipartFile file, String nameFile) throws Exception {
        DocumentReference documentReference = firestore.collection(COLLECTION_NAME).document();
        promotion.setImageName(nameFile);
        ApiFuture<WriteResult> apiFuture = documentReference.set(promotion);
        fileService.uploadFiles(file, nameFile);
        return apiFuture.get().getUpdateTime().toString();
    }

    // 홍보 삭제
    public String deletePromotion(String id) throws Exception {
        ApiFuture<DocumentSnapshot> apiFuture = firestore.collection(COLLECTION_NAME).document(id).get();
        fileService.deleteFile(apiFuture.get().getString("imageName"));
        firestore.collection(COLLECTION_NAME).document(id).delete();
        return "Document " + id + " is deleted";
    }

    // 전체 홍보 가져오기
    public List<Pair<Promotion, String>> getAllPromotions() throws Exception {
        List<Pair<Promotion, String>> list = new ArrayList<>();
        ApiFuture<QuerySnapshot> apiFuture = firestore.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> documentSnapshots = apiFuture.get().getDocuments();
        for (QueryDocumentSnapshot snapshot : documentSnapshots) {
            // 마감일이 지났으면 DB에서 삭제
            if(snapshot.toObject(Promotion.class).getFinish().compareTo(new Date()) < 0) {
                firestore.collection(COLLECTION_NAME).document(snapshot.getId()).delete();
                fileService.deleteFile(snapshot.getString("imageName"));
            }
            else {
                String imageUrl = fileService.getImageUrl(snapshot.getString("imageName"));
                list.add(new Pair<>(snapshot.toObject(Promotion.class), imageUrl));
            }
        }

        list.sort((Pair<Promotion, String> p1, Pair<Promotion, String> p2) -> {
            if(p1.getFirst().getStart().before(p2.getFirst().getStart()))
                return -1;
            else return 1;
        });

        return list;
    }

    // 특정 건물 홍보 가져오기
    public List<Pair<Promotion, String>> getPromotions(String hall) throws Exception {
        List<Pair<Promotion, String>> list = new ArrayList<>();
        ApiFuture<QuerySnapshot> apiFuture
                = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("hall", hall).get();
        List<QueryDocumentSnapshot> documentSnapshots = apiFuture.get().getDocuments();

        for (QueryDocumentSnapshot snapshot : documentSnapshots) {
            String imageUrl = fileService.getImageUrl(snapshot.getString("imageName"));
            list.add(new Pair<>(snapshot.toObject(Promotion.class), imageUrl));
        }

        list.sort((Pair<Promotion, String> p1, Pair<Promotion, String> p2) -> {
            if(p1.getFirst().getStart().before(p2.getFirst().getStart()))
                return -1;
            else return 1;
        });
        return list;
    }
}
