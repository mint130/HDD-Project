import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from "./Roommate_recruit_detail_page.module.css"
import jwt_decode from "jwt-decode";
import Comment_list from "../comment/Comment_list";
//게시글 상세 페이지
const Roommate_recruit_detail_page=({boardId, created, memberId, dormType, sex, grade, info, recruited, pattern, openChat, smoke, korean, commentList, onCommentSubmit})=>{
    const navigate = useNavigate();
    const jwtToken = localStorage.getItem('jwtToken');
    const [isWriter, setIsWriter]=useState(false);
    
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
    };
    const moveToUpdate=()=>{
        navigate(`/recruitment/roommate/${boardId}/update`);
    }
    const deleteBoard=async () =>{
        if(window.confirm('게시글을 삭제하시겠습니까?')){
            await axios.get(`//localhost:8080/recruitment/roommate/${boardId}/delete`, { headers: headers }).then((res)=>{
                console.log(res);
                alert(res.data.message);
                navigate('/recruitment/roommate');
            });
        }
    }
    const closeBoard=async ()=>{
        if(window.confirm('마감하시겠습니까?')){
            await axios.get(`//localhost:8080/recruitment/roommate/${boardId}/close`,{headers: headers}).then((res)=>{
                console.log(res);
                alert(res.data.message);
                navigate('/recruitment/roommate');
            });
        }
    }
    useEffect(() => {
        //console.log(commentList);
        const currentUserId = jwt_decode(jwtToken).sub;
        if (memberId === currentUserId) setIsWriter(true);


    }, []);

    return (
        <div className={styles.container} >
            <h1 className={styles.title}>룸메이트 구인</h1>
            <div className={styles.content}>
                <div className={styles.row}>
                    <div className={styles.list}>
                        <label htmlFor="sex">성별</label>
                    </div>
                    {sex=='M'?"남":"여"}
                </div>
                <div className={styles.row}>
                    <div className={styles.list}>
                        <label htmlFor="grade">학년</label>
                    </div>
                    {grade==0?"기타":grade+"학년"}
                </div>
                <div className={styles.row}>
                    <div className={styles.list}>
                        <label htmlFor="dormType">유형</label>
                    </div>
                    {dormType==0?"자취":dormType+"기숙사"}
                </div>
                <div className={styles.row}>
                    <div className={styles.list}>
                        <label htmlFor="korean">국적</label>
                    </div>
                    {korean==true?"내국인":"외국인"}
                </div>
                <div className={styles.row}>
                    <div className={styles.list}>
                        <label htmlFor="smoke">흡연 여부</label>
                    </div>
                    {smoke==true?"흡연":"비흡연"}
                </div>
                <div className={styles.row}>
                    <div className={styles.list}>
                        <label htmlFor="pattern">생활 패턴</label>
                    </div>
                    <div className={styles.wrap}>
                        {pattern}</div>
                </div>
                <div className={styles.row}>
                    <div className={styles.list}>
                        <label htmlFor="info">추가 내용</label>
                    </div>
                    <div className={styles.wrap}>
                        {info}</div>
                </div>
                <div className={styles.row}>
                    <div className={styles.list}>
                        <label htmlFor="openChat">오픈 채팅</label>
                    </div>
                    <div className={styles.wrap}><a href={openChat}>{openChat}</a> </div>
                </div>
                {recruited==false&&isWriter==true?
                    <div className={styles.btn_area}>
                        <button  className={styles.btn_type + " " + styles.btn_primary} onClick={deleteBoard}>삭제</button>
                        <button  className={styles.btn_type + " " + styles.btn_primary} onClick={moveToUpdate}>수정</button>
                        <button className={styles.btn_type + " " + styles.btn_primary} onClick={closeBoard}>마감하기</button>
                    </div>:
                    null}
                <div>
                    <Comment_list commentList={commentList} boardId={boardId} onCommentSubmit={onCommentSubmit} type={"roommate"}/>

                </div>
            </div>
        </div>
    );
}

export default Roommate_recruit_detail_page;

