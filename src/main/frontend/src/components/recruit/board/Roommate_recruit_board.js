import React, {useState, useEffect, useRef} from "react";
import axios, {postForm} from "axios";
import styles from "./Roommate_recurit_board.module.css";
import {Link, useNavigate} from 'react-router-dom';
import Search_block from "../search/Search_block";
import {setBatch} from "react-redux/es/utils/batch";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import Pagination from "./Pagination";
import Table from "./Table";

//게시판 글 목록
function Roommate_recruit_board(){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [boardList, setBoardList] = useState([]);
    const [search, setSearch]=useState(false);
    const [limit, setLimit] = useState(10); //페이지 당 게시물 수
    const [page, setPage] = useState(1);    //현재 페이지 번호
    const offset = (page - 1) * limit;  //첫 게시물의 위치

    const onClickSearch=()=>{
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
            setLoading(false);
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



    function reload(){
        window.location.reload();
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
                   <Search_block onSearch={getSearchBoardList} />
                </div>
                {loading?
                    <h2>Loading...</h2> :(
                        boardList.length!=0
                            ?
                            <Table
                                boardList={boardList}
                                offset={offset}
                                limit={limit}/>
                            : <h2>검색 결과가 없습니다</h2>)}

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