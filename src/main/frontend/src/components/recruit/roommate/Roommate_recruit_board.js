import React, {useState, useEffect, useRef} from "react";
import axios, {postForm} from "axios";
import styles from "./Roommate_recurit_board.module.css";
import {Link, useNavigate} from 'react-router-dom';
import Select from "react-select";

//게시판 글 목록
function Roommate_recruit_board(){
    const navigate = useNavigate();
    const [boardList, setBoardList] = useState([]);



    const navigateToWritePage = () => {
        navigate("/recruitment/roommate/write");
    };
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
    };
    const getBoardList = async () => {
        try {
            const resp = await axios.get('http://localhost:8080/recruitment/roommate', { headers: headers });
            setBoardList(resp.data);
            console.log(resp.data); // 콘솔에 데이터 출력

        } catch (error) {
            console.error('Error fetching board list:', error);
        }
    }


    useEffect(() => {
        getBoardList(); // 페이지 진입 시 getBoardList 호출
        

    }, []);


    function handleRowClick(boardId) {
        navigate(`/recruitment/roommate/${boardId}`)

    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>룸메이트 구인</h1>
            <div className={styles.content}>
                <table>
                    <thead>
                    <tr>
                        <th>성별</th>
                        <th>학년</th>
                        <th>유형</th>
                        <th>국적</th>
                        <th>흡연 여부</th>
                        <th>내용</th>
                        <th>구인 상태</th>
                    </tr>
                    </thead>
                    <tbody>
                    {boardList.map((board) => (
                        
                        <tr key={board.boardId} onClick={() => handleRowClick(board.boardId)}>
                            <td>{board.sex=="M"?"남":"여"}</td>
                            <td>{board.grade==0?"기타":board.grade+"학년"}</td>
                            <td>{board.dormType==0?"자취":board.dormType+"기숙사"}</td>
                            <td>{board.korean==true?"내국인":"외국인"}</td>
                            <td>{board.smoke==true?"흡연":"비흡연"}</td>
                            <td>{board.pattern}</td>
                            <td>{board.recruited==false?"구인 중":"구인 완료"}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.btn_area}>
                <button className={styles.btn_type + " " + styles.btn_primary} type="submit" onClick={navigateToWritePage}>글쓰기</button>
            </div>
        </div>
    );
}

export default Roommate_recruit_board