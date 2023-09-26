package com.HDD.promotion.service;

import com.HDD.promotion.model.Promotion;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;

@Service
public class PromotionService {
    private static final String COLLECTION_NAME = "Promotion";
    private final Firestore firestore = FirestoreClient.getFirestore();

    // 홍보 추가
    public String insertPromotion(Promotion promotion) throws Exception {
        DocumentReference documentReference
                = firestore.collection(COLLECTION_NAME).document();
        ApiFuture<WriteResult> apiFuture
                = documentReference.set(promotion);

        return apiFuture.get().getUpdateTime().toString();
    }

    // 홍보 삭제
    public String deletePromotion(String id) throws Exception {
        ApiFuture<WriteResult> apiFuture = firestore.collection(COLLECTION_NAME).document(id).delete();
        return "Document " + id + " is deleted";
    }

    // 전체 홍보 가져오기
    public List<Promotion> getAllPromotions() throws Exception {
        List<Promotion> list = new ArrayList<>();
        ApiFuture<QuerySnapshot> apiFuture = firestore.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> documentSnapshots = apiFuture.get().getDocuments();
        for (QueryDocumentSnapshot snapshot : documentSnapshots) {
            // 마감일이 지났으면 DB에서 삭제
            if(snapshot.toObject(Promotion.class).getFinish().compareTo(new Date()) < 0) {
                firestore.collection(COLLECTION_NAME).document(snapshot.getId()).delete();
            }
            else list.add(snapshot.toObject(Promotion.class));
        }
        list.sort(Comparator.comparing(Promotion::getStart));
        return list;
    }

    // 특정 건물 홍보 가져오기
    public List<Promotion> getPromotions(String hall) throws Exception {
        List<Promotion> list = new ArrayList<>();
        ApiFuture<QuerySnapshot> apiFuture
                = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("hall", hall).get();
        List<QueryDocumentSnapshot> documentSnapshots = apiFuture.get().getDocuments();

        for (QueryDocumentSnapshot snapshot : documentSnapshots) {
            list.add(snapshot.toObject(Promotion.class));
        }
        return list;

    }
}
