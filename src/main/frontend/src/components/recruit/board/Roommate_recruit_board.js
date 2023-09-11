import React, {useState, useEffect, useRef} from "react";
import axios, {postForm} from "axios";
import styles from "./Roommate_recurit_board.module.css";
import {Link, useNavigate} from 'react-router-dom';
import Roommate_recruit_search from "../search/Roommate_recruit_search";
import {setBatch} from "react-redux/es/utils/batch";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import Pagination from "./Pagination";

//게시판 글 목록
function Roommate_recruit_board(){
    const navigate = useNavigate();
    const [boardList, setBoardList] = useState([]);
    const [search, setSearch]=useState(false);
    const [limit, setLimit] = useState(10); //페이지 당 게시물 수
    const [page, setPage] = useState(1);    //현재 페이지 번호
    const offset = (page - 1) * limit;  //첫 게시물의 위치

    const onClickSearch=(e)=>{
        setSearch(!search);
    };


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
            //console.log(resp.data); // 콘솔에 데이터 출력

        } catch (error) {
            alert("로그인이 필요합니다.");
            navigate("/api/auth/signin");
        }
    }


    const getSearchBoardList= async (searchParams)=>{
        try{
            console.log(searchParams);
            const resp=await axios.get('http://localhost:8080/recruitment/roommate/search',{
                params:searchParams,
                headers: headers}
             );
            setBoardList(resp.data);
        }
        catch (e) {
            console.log(e);
        }

    }

    useEffect(() => {
        getBoardList(); // 페이지 진입 시 getBoardList 호출
        

    }, []);


    function handleRowClick(boardId) {
        navigate(`/recruitment/roommate/${boardId}`)

    }

    function reload(){
        window.location.reload();
    }

    const Table=()=>{
        return (
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
            {boardList.slice(offset, offset+limit).map((board) => (
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
        </table>)
    }

    return (
        <div className={styles.container}>
            <div className={styles.title_area}>
                <h1 className={styles.title} onClick={reload}>룸메이트 구인</h1>
                <div className={styles.search_area}>
                    <button className={styles.btn_search+" "+styles.btn_secondary}
                            onClick={onClickSearch}>
                        {search?
                            <div className={styles.icon}>
                            검색닫기
                            <HiChevronUp className={styles.icon}/>
                            </div>:
                            <div className={styles.icon}>
                            검색하기
                            <HiChevronDown className={styles.icon}/>
                        </div>}
                    </button>
                </div>
            </div>

            <div className={styles.content}>
                <div className={`${styles.search_block_area} ${search ? styles.open : ''}`}>
                   <Roommate_recruit_search onSearch={getSearchBoardList} />
                </div>
                {boardList.length!=0?
                    <Table />:
                    <h2>검색 결과가 없습니다</h2>
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

export default Roommate_recruit_board