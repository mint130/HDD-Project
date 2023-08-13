import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Roommate_recruit_detail_page from "../components/recruit/roommate/Roommate_recruit_detail_page";
import Project_recruit_detail_page from "../components/recruit/project/Project_recruit_detail_page";

//게시글 상세
const Roommate_recruit_detail=()=>{
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
            const resp = await axios.get(`http://localhost:8080/recruitment/roommate/${boardId}`,{headers:headers});
            setBoard(resp.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching board:', error);
            setLoading(true);
        }
    };

    useEffect(() => {
        getBoard();
    }, []);

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
                    />
                )}
        </div>
    );
};

export default Roommate_recruit_detail