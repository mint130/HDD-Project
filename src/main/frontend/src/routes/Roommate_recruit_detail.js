import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Roommate_recruit_detail_page from "../components/recruit/detail/Roommate_recruit_detail_page";

//게시글 상세
const Roommate_recruit_detail=()=>{
    const { boardId } = useParams();
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState({});
    const [commentList, setCommentList]=useState([]);

    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
    };

    const getBoard = async () => {
        try {
            const resp = await axios.get(`http://localhost:8080/recruitment/roommate/${boardId}`,{headers:headers});
            setBoard(resp.data.board);
            setCommentList(resp.data.comment);

            //console.log(board);
            //console.log(commentList);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching board:', error);
            setLoading(true);
        }
    };

    useEffect(() => {
        getBoard();
    }, []);

    const handleCommentSubmit = async () => {
        // 댓글 작성 후 실행할 함수
        await getBoard(); // 데이터 다시 로드
    };

    return(
        <div>
            {loading ? (<h2>Loading...</h2>)
                : (
                    <Roommate_recruit_detail_page
                        boardId={board.boardId}
                        recruited={board.recruited}
                        memberId={board.memberId}
                        korean={board.korean}
                        smoke={board.smoke}
                        sex={board.sex}
                        pattern={board.pattern}
                        grade={board.grade}
                        dormType={board.dormType}
                        created={board.created}
                        info={board.info}
                        openChat={board.openChat}
                        commentList={commentList}
                        onCommentSubmit={handleCommentSubmit}
                    />


                )}
        </div>
    );
};

export default Roommate_recruit_detail