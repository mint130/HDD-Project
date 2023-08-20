import React, { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import styles from "./Comment.module.css";
import Reply from "./Reply";
const Comment=({commentList, boardId, onCommentSubmit, type})=>{

    const [isReplyOpen, setReplyOpen] = useState(false);
    const handleCommentClick = () => {
        setReplyOpen(prevState => !prevState); // 개별 답글의 상태를 토글
    };

    const{register,  setValue, handleSubmit, formState: {errors}}=useForm();
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
    };
    useEffect(()=>{
        console.log(commentGroups);
    },[
        commentList
    ])
    //댓글 작성 함수
    const writeComment=data=>{
        console.log(data);
        axios.post(`http://localhost:8080/recruitment/${type}/${boardId}/comment`, {
            content: data.content
        }, {
            headers: headers,
        })
            .then(() => {
                alert('댓글을 등록했습니다.');
                onCommentSubmit();
                setValue('content', '');
            })
            .catch(error => console.error(error));

    };
    //댓글 삭제 함수
    const deleteComments=(commentId)=>{
        axios.get(`http://localhost:8080/recruitment/${type}/${boardId}/${commentId}/delete`, {headers:headers}).then(()=>{
            alert('댓글이 삭제되었습니다.');
            onCommentSubmit();

        }).catch(error=>console.error(error));
    }
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

    const RenderComments = (comments) => {

        return comments.map((comment) => (

            <li key={comment.commentId}
                className={`${comment.commentId === comment.parentId ? styles.original_comment : styles.reply_comment}`}>
                <h2>{comment.nickname} 님</h2>
                <h3>{comment.content}</h3>
                {comment.commentId === comment.parentId ?
                    <div>
                        <button onClick={handleCommentClick}>답글</button>
                        {isReplyOpen?<Reply commentId={comment.commentId} boardId={boardId} onCommentSubmit={onCommentSubmit} type={type} />:null}
                    </div>
                    : null
                }
                {
                    <button onClick={()=>deleteComments(comment.commentId)}>삭제</button>
                }
            </li>
        ));
    };


    const onError= errors=>console.log(errors);
    return (
        <div className={styles.comment_row}>
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
            <div className={styles.comment_write}>
                <form
                    onSubmit={handleSubmit(writeComment,onError)}>
                    <textarea
                        className={styles.textarea}
                        type="text"
                        id="title"
                        placeholder="댓글을 입력하세요"
                        {...register('content')}
                    />
                    <button className={styles.btn_type + " " + styles.btn_primary} type="submit">댓글 작성</button>
                </form>
            </div>
        </div>
    );

}

export default Comment;