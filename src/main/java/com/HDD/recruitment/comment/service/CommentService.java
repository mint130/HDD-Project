package com.HDD.recruitment.comment.service;

import com.HDD.recruitment.comment.model.Comment;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CommentService {
    private static final String COLLECTION_NAME = "COMMENT";
    private String collectionName;    // 룸메 구인인지 플젝 구인인지 구분
    private Firestore firestore = FirestoreClient.getFirestore();

    public void setCollectionName(String collectionName) {
        this.collectionName = collectionName;
    }

    // 댓글 달기
    public String insertComment(String boardId, String commentId, Comment comment) throws Exception {
        DocumentReference documentReference
                = firestore.collection(collectionName).document(boardId)
                .collection(COLLECTION_NAME).document();
        comment.setCommentId(documentReference.getId());
        // commentId가 null인 경우 첫번째 댓글
        if(commentId == null){
            comment.setParentId(documentReference.getId());
        }
        else{   // 아닌 경우 답글
            comment.setParentId(commentId);
        }
        ApiFuture<WriteResult> apiFuture
                = documentReference.set(comment);
        return apiFuture.get().getUpdateTime().toString();
    }
    // 답글 달기
    public String insertReply(String boardId, String commentId, Comment comment) throws Exception {
        return null;
    }

    public List<Comment> getComments(String boardId) throws Exception {
        List<Comment> list = new ArrayList<>();
        ApiFuture<QuerySnapshot> apiFuture
                = firestore.collection(collectionName).document(boardId)
                .collection(COLLECTION_NAME).orderBy("created").orderBy("parentId").get();
        List<QueryDocumentSnapshot> documentSnapshots = apiFuture.get().getDocuments();

        for (QueryDocumentSnapshot snapshot : documentSnapshots) {
            list.add(snapshot.toObject(Comment.class));
        }
        return list;
    }

    // 원댓 삭제 시 memberId, content "삭제된 댓글입니다" 로 변경
    // 답댓 삭제 시 삭제
    public String deleteComment(String boardId, String commentId) throws Exception {
        DocumentReference documentReference = firestore.collection(collectionName).document(boardId)
                .collection(COLLECTION_NAME).document(commentId);
        ApiFuture<DocumentSnapshot> apiFuture = documentReference.get();

        // 원댓
        if (apiFuture.get().get("parentId") == apiFuture.get().get("commentId")) {
            documentReference.update("memberId", null);
            documentReference.update("content", "삭제된 댓글입니다");
        }
        else{
            documentReference.delete();
        }
        return "Comment " + commentId + "is deleted";
    }
}
