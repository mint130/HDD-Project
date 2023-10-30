import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Project_recruit_detail_page from "../components/recruit/detail/Project_recruit_detail_page";

//게시글 상세
const Project_recruit_detail = () => {
    const { boardId } = useParams();
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState({});
    const [commentList, setCommentList]=useState([]);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
    };

    const getBoard = async () => {
        try {
            const resp = await axios.get(`http://localhost:8080/recruitment/project/${boardId}`,{headers:headers});
            console.log(resp.data);
            setBoard(resp.data.board.first);
            setCommentList(resp.data.comment);
            setIsBookmarked(resp.data.bookmark);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching board:', error);
            setLoading(true);
        }
    };

    useEffect(() => {
        getBoard();
    }, []);
    const handleSubmit = async () => {
        // 댓글 작성 후 실행할 함수
        await getBoard(); // 데이터 다시 로드
    };
    return (
        <div>
            {loading ? (<h2>Loading...</h2>)
                : (
                    <Project_recruit_detail_page
                        boardId={board.boardId}
                        recruited={board.recruited}
                        memberId={board.memberId}
                        title={board.title}
                        major={board.major}
                        num={board.num}
                        startDay={board.startDay}
                        finishDay={board.finishDay}
                        grade={board.grade}
                        info={board.info}
                        openChat={board.openChat}
                        commentList={commentList}
                        isBookmarked={isBookmarked}
                        onSubmit={handleSubmit}
                    />
                )}
        </div>
    );
};

export default Project_recruit_detail;
