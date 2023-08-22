import React, { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import styles from "./Comment.module.css";
import Reply from "./Reply";
import { HiReply, HiTrash } from "react-icons/hi";
//import IconButton from "@mui/material/IconButton";
//import CommentIcon from '@mui/icons-material/Comment_list';
import jwt_decode from "jwt-decode";
import Comment from "./Comment";
const Comment_list=({commentList, boardId, onCommentSubmit, type})=>{

    const{register,  setValue, handleSubmit, formState: {errors}}=useForm();
    const jwtToken = localStorage.getItem('jwtToken');
    const currentUserId = jwt_decode(jwtToken).sub;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
    };
    useEffect(()=>{
        console.log(commentGroups);
        console.log(currentUserId);
    },[
        commentList
    ])

    const commentGroups = {};
    // 원댓글과 대댓글을 정확한 위치에 그룹화
    commentList.forEach((comment) => {
        if (!commentGroups[comment.parentId]) {
            commentGroups[comment.parentId] = [];
        }

        // 원댓글과 대댓글을 적절한 위치에 추가
        if (comment.parentId === null) {
            commentGroups[comment.commentId] = [comment]; // 원댓글
        } else {
            if (!commentGroups[comment.parentId]) {
                commentGroups[comment.parentId] = [];
            }
            commentGroups[comment.parentId].push(comment); // 대댓글
        }
    });

    const CommentItem = ({ comment, boardId, onCommentSubmit, type }) => {
        const [isReplyOpen, setReplyOpen] = useState(false);
        //답글 창 제어 함수
        const handleCommentClick = () => {
            setReplyOpen(prevState => !prevState);
        };
        //댓글 삭제 함수
        const deleteComment = (commentId) => {
            if(window.confirm('댓글을 삭제하시겠습니까?')){
                axios.get(`http://localhost:8080/recruitment/${type}/${boardId}/${commentId}/delete`, {headers:headers}).then(()=>{
                alert('댓글이 삭제되었습니다.');
                onCommentSubmit();
            }).catch(error=>console.error(error));}
        };

        return (
            <div className={styles.comment_row}>
                <li key={comment.commentId}
                    className={`${comment.commentId === comment.parentId ? styles.original_comment : styles.reply_comment}`}>
                    <h2>{comment.nickname} 님</h2>
                    <h3>{comment.content}</h3>


                    <div className={styles.icon_row}>
                        {comment.memberId==currentUserId?
                            <HiTrash className={styles.icon} onClick={() => deleteComment(comment.commentId)}/>
                            :null}
                        {comment.commentId === comment.parentId ?
                            <HiReply className={styles.icon} onClick={handleCommentClick}/>
                            :null}
                    </div>

                </li>
                {isReplyOpen ?
                    <Reply commentId={comment.commentId} boardId={boardId} onCommentSubmit={onCommentSubmit} type={type} /> : null}
            </div>
        );
    };

   const RenderComments = (comments) => {

       return comments.map((comment) => (
           <CommentItem key={comment.commentId} comment={comment} boardId={boardId} onCommentSubmit={onCommentSubmit} type={type} />
       ));
    };


    const onError= errors=>console.log(errors);
    return (
        <div className={styles.comment_row}>
            <div className={styles.comment_list}>
                <ul>
                    {commentGroups[null] && RenderComments(commentGroups[null])}
                    {Object.keys(commentGroups).map((parentId) => {
                        if (parentId !== 'null') {
                            return (
                                <li key={parentId}>
                                    <ul>{RenderComments(commentGroups[parentId])}
                                    </ul>
                                </li>
                            );
                        }
                        return null;
                    })}
                </ul>
            </div>
            <Comment onCommentSubmit={onCommentSubmit} boardId={boardId} type={type}/>
        </div>
    );

}

export default Comment_list;