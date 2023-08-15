import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Project_recruit_detail_page from "../components/recruit/project/Project_recruit_detail_page";

//게시글 상세
const Project_recruit_detail = () => {
    const { boardId } = useParams();
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState({});

    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
    };

    const getBoard = async () => {
        try {
            const resp = await axios.get(`http://localhost:8080/recruitment/project/${boardId}`,{headers:headers});
            setBoard(resp.data.board);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching board:', error);
            setLoading(true);
        }
    };

    useEffect(() => {
        getBoard();
    }, []);

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
                    />
                )}
        </div>
    );
};

export default Project_recruit_detail;
