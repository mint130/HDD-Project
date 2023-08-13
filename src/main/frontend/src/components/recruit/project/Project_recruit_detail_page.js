import React, {useState, useEffect, useRef} from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ko';
import styles from './Project_recruit_detail_page.module.css';
import jwt_decode from "jwt-decode";

//게시글 상세 페이지
const Project_recruit_detail_page=
    ({boardId, memberId, title, major, num, startDay, finishDay, grade, info, openChat, created, recruited})=>{
        const navigate = useNavigate();
        const jwtToken = localStorage.getItem('jwtToken');
        const [isWriter, setIsWriter]=useState(false);
        const [dateRange, setDateRange]=useState('');
        const [newGrade, setNewGrade]=useState('');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`,
        };

        const moveToUpdate=()=>{
            navigate(`/recruitment/project/${boardId}/update`);
        }
        const deleteBoard=async () =>{
         if(window.confirm('게시글을 삭제하시겠습니까?')){
            await axios.get(`//localhost:8080/recruitment/project/${boardId}/delete`, { headers: headers }).then((res)=>{
                console.log(res);
                alert(res.data.message);
                navigate('/recruitment/project');
                });
            }
        }
        const closeBoard=async ()=>{
            if(window.confirm('마감하시겠습니까?')){
                await axios.get(`//localhost:8080/recruitment/project/${boardId}/close`,{headers: headers}).then((res)=>{
                    console.log(res);
                    alert(res.data.message);
                    navigate('/recruitment/project');
                });
            }
        }
        useEffect(() => {
            const currentUserId = jwt_decode(jwtToken).sub;
            //jwt decode 결과 :console.log(jwt_decode(jwtToken));
            if (memberId === currentUserId) setIsWriter(true);
            if (startDay != null && finishDay != null) {
                const formattedStartDay = moment(startDay).format('YYYY-MM-DD');
                const formattedFinishDay = moment(finishDay).format('YYYY-MM-DD');
                setDateRange(formattedStartDay + " - " + formattedFinishDay);
            } else {
                setDateRange("미정");
            }
            if(grade===0) setNewGrade('기타'); else setNewGrade(grade+"학년");
        }, []);



    return (
        <div className={styles.container} >
            <h1 className={styles.title}>프로젝트 구인</h1>
            <div className={styles.content}>
                <div className={styles.row}>
                    <div className={styles.list}>
                        <label htmlFor="title">제목</label>
                    </div>
                    {title}
                </div>
                <div className={styles.row}>
                    <div className={styles.list}>
                        <label htmlFor="major">과</label>
                    </div>
                    {major}과
                </div>
                <div className={styles.row}>
                    <div className={styles.list}>
                        <label htmlFor="num">인원</label>
                    </div>
                    {num}명
                </div>
                <div className={styles.row}>
                    <div className={styles.list}>
                        <label htmlFor="date">기간</label>
                    </div>
                    {dateRange}
                </div>
                <div className={styles.row}>
                    <div className={styles.list}>
                        <label htmlFor="grade">학년</label>
                    </div>
                    {newGrade}
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

export default Project_recruit_detail_page;