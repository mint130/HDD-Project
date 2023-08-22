import React, { useEffect, useState } from 'react';
import axios from "axios";
import {useForm} from 'react-hook-form';
import styles from "./Comment.module.css";
const Reply=({boardId, commentId, onCommentSubmit, type})=>{

    const{register, setValue, handleSubmit,  formState: {errors}}=useForm();
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
    };
    const writeReply=data=>{
        axios.post(`http://localhost:8080/recruitment/${type}/${boardId}/comment/${commentId}`, {
            content: data.content,
        }, {
            headers: headers,
        })
            .then(() => {
                alert('답글을 등록했습니다.');
                onCommentSubmit();
                setValue('content', '');
            })
            .catch(error => console.error(error));


    }
    const onError= errors=>console.log(errors);

    return (
            <form className={styles.comment_write}
                onSubmit={handleSubmit(writeReply,onError)}>
                    <textarea
                        className={styles.textarea}
                        type="text"
                        id="title"
                        placeholder="답글을 입력하세요"
                        {...register('content')}
                    />
                <button className={styles.btn_type + " " + styles.btn_primary} type="submit">답글 작성</button>
            </form>

    );
}
export default Reply;