import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from "./Roommate_recruit_detail_page.module.css"
import jwt_decode from "jwt-decode";

//게시글 상세 페이지
const Roommate_recruit_detail_page=({boardId, created, memberId, dormType, sex, grade, info, recruited, pattern, openChat, smoke, korean})=>{
    const navigate = useNavigate();
    const jwtToken = localStorage.getItem('jwtToken');
    const [isWriter, setIsWriter]=useState(false);
    
    const [isKorean, setIsKorean]=useState('');
    const [newSex, setNewSex]=useState('');
    const [isSmoke, setIsSmoke]=useState('');
    const [newGrade, setNewGrade]=useState('');
    const [newDormType, setNewDormType]=useState('');
    
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
        const currentUserId = jwt_decode(jwtToken).sub;
        if (memberId === currentUserId) setIsWriter(true);
        if(korean==true) setIsKorean("내국인");
        else setIsKorean("외국인");
        if(sex=='M') setNewSex('남')
        else setNewSex('여');
        if(smoke==true) setIsSmoke('흡연');
        else setIsSmoke('비흡연');
        if(grade===0) setNewGrade('기타'); else setNewGrade(grade+"학년");
        if (dormType===0) setNewDormType('자취'); else setNewDormType(dormType+"기숙사");

    }, []);

    return (
        <div className={styles.container} >
            <h1 className={styles.title}>룸메이트 구인</h1>
            <div className={styles.content}>
                <div className={styles.row}>
                    <div className={styles.list}>
                        <label htmlFor="sex">성별</label>
                    </div>
                    {newSex}
                </div>
                <div className={styles.row}>
                    <div className={styles.list}>
                        <label htmlFor="grade">학년</label>
                    </div>
                    {newGrade}
                </div>
                <div className={styles.row}>
                    <div className={styles.list}>
                        <label htmlFor="dormType">유형</label>
                    </div>
                    {newDormType}
                </div>
                <div className={styles.row}>
                    <div className={styles.list}>
                        <label htmlFor="korean">국적</label>
                    </div>
                    {isKorean}
                </div>
                <div className={styles.row}>
                    <div className={styles.list}>
                        <label htmlFor="smoke">흡연 여부</label>
                    </div>
                    {isSmoke}
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
                    <div className={styles.btn_area}></div>}

            </div>
        </div>
    );
}

export default Roommate_recruit_detail_page;

