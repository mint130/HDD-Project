import React from "react";
import {useNavigate} from "react-router-dom";

const Table=({boardList, offset, limit})=>{
    const navigate = useNavigate();

    function handleRowClick(boardId) {
        navigate(`/recruitment/roommate/${boardId}`)

    }

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

export default Table;