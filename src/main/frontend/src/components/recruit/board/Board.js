import styles from "./Project_recruit_board.module.css";
import moment from "moment";
import {Link} from "react-router-dom";
import React from "react";

const Board=({boardList, offset, limit})=>{
    return (
        <ul className={styles.row}>
            {boardList.slice(offset, offset+limit).map((board)=>{
                    let startDay = "";
                    if(board.startDay!=null){ startDay=moment(board.startDay).format('YYYY-MM-DD');}
                    let finishDay="";
                    if(board.finishDay!=null){finishDay=moment(board.finishDay).format('YYYY-MM-DD');}
                    const dateRange = startDay !== "" && finishDay !== "" ? startDay + " - " + finishDay : "미정";
                    return (
                        <div>
                            <div className={styles.column}>
                                <li className={styles.column_left} key={board.boardId}>
                                    <Link to={`/recruitment/project/${board.boardId}`}>
                                        <h1 className={styles.post_title}>{board.title}</h1>
                                        <div className={styles.post_content}>
                                            <span className={styles.post_variable}>{board.major+"과"}</span>
                                            <span className={styles.post_variable}> {board.grade==0?"기타":board.grade+"학년"}</span>
                                            <span className={styles.post_variable}> {board.num+"명"}</span>
                                            <span className={styles.post_variable}> {dateRange}</span>
                                            <span className={styles.post_variable}> {board.info}</span>
                                        </div>
                                    </Link>
                                </li>
                                <div className={styles.column_right}><h4>{board.recruited==false?"구인 중":"구인 완료"}</h4></div>
                            </div>
                            <hr></hr>
                        </div>
                    );
                }
            )}
        </ul>
    )


}

export default Board;