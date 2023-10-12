import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Detail_page.module.css';
import jwt_decode from "jwt-decode";
import Comment_list from "../comment/Comment_list";
import Bottom_button from "./Bottom_button";
import List from "./List";

//게시글 상세 페이지
const Roommate_recruit_detail_page=(
    {boardId, created, memberId, dormType, sex, grade, info, recruited, pattern, openChat, smoke, korean, commentList, onSubmit, isBookmarked})=>{
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

    const Writer_button=()=>{
        return (
            <div className={styles.btn_area}>
                <button  className={styles.btn_type + " " + styles.btn_primary} onClick={deleteBoard}>삭제</button>
                <button  className={styles.btn_type + " " + styles.btn_primary} onClick={moveToUpdate}>수정</button>
                <button className={styles.btn_type + " " + styles.btn_primary} onClick={closeBoard}>마감하기</button>
            </div>
        );
    }


    useEffect(() => {
        //console.log(commentList);
        const currentUserId = jwt_decode(jwtToken).sub;
        if (memberId === currentUserId) setIsWriter(true);
    }, []);

    return (
        <div>
            <div className={styles.container} >
                <h1 className={styles.title}>룸메이트 구인</h1>
                <div className={styles.content}>
                    <List label={'성별'} item={sex=='M'?"남":"여"}/>
                    <List label={'학년'} item={grade==0?"기타":grade+"학년"}/>
                    <List label={'유형'} item={dormType==0?"자취":dormType+"기숙사"}/>
                    <List label={'국적'} item={korean==true?"내국인":"외국인"}/>
                    <List label={'흡연 여부'} item={smoke==true?"흡연":"비흡연"}/>
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
                        <Writer_button /> :
                        null}
                    <Comment_list commentList={commentList} boardId={boardId} onCommentSubmit={onSubmit} type={"roommate"}/>

                </div>
            </div>
            {recruited==false? <Bottom_button url={openChat} onButtonSubmit={onSubmit} isBookmarked={isBookmarked}/> : null}
        </div>

    );
}

export default Roommate_recruit_detail_page;

