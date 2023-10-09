import React, {useState, useEffect, useRef} from "react";
import axios, {postForm} from "axios";
import styles from "./Project_recruit_board.module.css";
import { useNavigate, Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ko';
import Pagination from "./Pagination";
import Search_bar from "../search/Search_bar";
import Board from "./Board";
//게시판 글 목록
function Project_recruit_board(){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [boardList, setBoardList] = useState([]);
    const [limit, setLimit] = useState(5); //페이지 당 게시물 수
    const [page, setPage] = useState(1);    //현재 페이지 번호
    const offset = (page - 1) * limit;  //첫 게시물의 위치
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
            setLoading(false);

        } catch (error) {
            alert("로그인이 필요합니다.");
            navigate("/api/auth/signin");
        }
    }


    const getSearchBoardList = (search) => {

        const filterList = boardList.filter((p) => {
            return p.major.includes(search)+p.title.includes(search)+p.info.includes(search)
        })
        setBoardList(filterList)
    }

    useEffect(() => {
        getBoardList(); // 페이지 진입 시 getBoardList 호출

    }, []);

    // 게시글 작성 버튼
    const navigateToWritePage = () => {
        navigate("/recruitment/project/write");
    };


    function reload(){
        window.location.reload();
    }



    return (
        <div className={styles.container}>
            <div className={styles.title_area}>
                <h1 className={styles.title} onClick={reload}>프로젝트 구인</h1>
                <div className={styles.search_area}>
                    <Search_bar onSearch={getSearchBoardList} />
                </div>

            </div>

            <div className={styles.content}>
                {
                    loading? <h2>Loading...</h2>:(
                        boardList.length!=0
                            ? 
                            <Board
                                boardList={boardList}
                                offset={offset}
                                limit={limit}/>
                            : <h2>검색 결과가 없습니다</h2>   
                        )

                }
                <Pagination
                    total={boardList.length}
                    limit={limit}
                    page={page}
                    setPage={setPage}
                />
            </div>

            <div className={styles.btn_area}>
                <button className={styles.btn_type + " " + styles.btn_primary} type="submit" onClick={navigateToWritePage}>글쓰기</button>
            </div>
        </div>
    );
}

export default Project_recruit_board