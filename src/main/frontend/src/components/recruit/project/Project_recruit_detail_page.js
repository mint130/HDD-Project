import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

    return (
        <div>
            <h2>{title}</h2>
            <h5>{major}</h5>
            <h5>{num}</h5>
            <h5>{startDay}</h5>
            <h5>{finishDay}</h5>
            <h5>{grade}</h5>
            <h5>{info}</h5>
            <h5>{openChat}</h5>
            <div>
                <button onClick={deleteBoard}>삭제</button>
                <button onClick={moveToUpdate}>수정</button>
                <button>마감하기</button>
            </div>
        </div>

    );
    }

export default Project_recruit_detail_page;