import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ko';
import styles from './Project_recruit_detail_page.module.css';

//게시글 상세 페이지
const Project_recruit_detail_page=
    ({boardId, memberId, title, major, num, startDay, finishDay, grade, info, openChat, created, isRecruited})=>{
        const navigate = useNavigate();
        const jwtToken = localStorage.getItem('jwtToken');
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
        if(startDay!=null){ startDay=moment(startDay).format('YYYY-MM-DD');}
        if(finishDay!=null){finishDay=moment(finishDay).format('YYYY-MM-DD');}
        const dateRange = startDay !== null && finishDay !== null ? startDay + " - " + finishDay : "미정";
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
                    {grade}학년
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
                    <a href={openChat}>{openChat}</a>
                </div>
                <div className={styles.btn_area}>
                    <button  className={styles.btn_type + " " + styles.btn_primary} onClick={deleteBoard}>삭제</button>
                    <button  className={styles.btn_type + " " + styles.btn_primary} onClick={moveToUpdate}>수정</button>
                    <button className={styles.btn_type + " " + styles.btn_primary}>마감하기</button>
                </div>
            </div>

        </div>

    );
    }

export default Project_recruit_detail_page;