import React, {useState, useEffect, useRef} from "react";
import axios, {postForm} from "axios";
import styles from "./Project_recruit_board.module.css";
import { useNavigate, Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ko';
import Select from "react-select";

//게시판 글 목록
function Project_recruit_board(){
    const navigate = useNavigate();
    const [boardList, setBoardList] = useState([]);
    const [pageList, setPageList]=useState([]);

    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
    };

    const getBoardList = async () => {
        try {
            const resp = await axios.get('http://localhost:8080/recruitment/project', { headers: headers });
            setBoardList(resp.data);
            console.log(resp.data); // 콘솔에 데이터 출력

        } catch (error) {
            console.error('Error fetching board list:', error);
        }
    }

    useEffect(() => {
        getBoardList(); // 페이지 진입 시 getBoardList 호출
    }, []);

    // 게시글 작성 버튼
    const navigateToWritePage = () => {
        navigate("/recruitment/project/write");
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>프로젝트 구인</h1>
            <div className={styles.content}>
                <ul className={styles.row}>
                    {boardList.map((board)=>{
                            let startDay = "";
                            if(board.startDay!=null){ startDay=moment(board.startDay).format('YYYY-MM-DD');}
                            let finishDay="";
                            if(board.finishDay!=null){finishDay=moment(board.finishDay).format('YYYY-MM-DD');}
                            const dateRange = startDay !== "" && finishDay !== "" ? startDay + " - " + finishDay : "미정";
                            let isRecruited="구인 중";
                            if(board.recruited==true){isRecruited="구인 완료";}
                            return (
                                <div>
                                    <div className={styles.column}>
                                        <li className={styles.column_left} key={board.boardId}>
                                            <Link to={`/recruitment/project/${board.boardId}`}>
                                                <h1 className={styles.post_title}>{board.title}</h1>
                                                <div className={styles.post_content}>
                                                    <span className={styles.post_variable}>{board.major+"과"}</span>
                                                    <span className={styles.post_variable}> {board.grade+"학년"}</span>
                                                    <span className={styles.post_variable}> {board.num+"명"}</span>
                                                    <span className={styles.post_variable}> {dateRange}</span>
                                                    <span className={styles.post_variable}> {board.info}</span>
                                                </div>
                                            </Link>
                                        </li>
                                        <div className={styles.column_right}><h4>{isRecruited}</h4></div>
                                    </div>
                                    <hr></hr>
                                </div>
                            );
                        }
                    )}
                </ul>
            </div>

            <div className={styles.btn_area}>
                <button className={styles.btn_type + " " + styles.btn_primary} type="submit" onClick={navigateToWritePage}>글쓰기</button>


            </div>
        </div>
    );
}

export default Project_recruit_board