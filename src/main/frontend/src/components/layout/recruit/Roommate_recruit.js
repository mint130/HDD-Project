import React, {useState, useEffect, useRef} from "react";
import axios, {postForm} from "axios";
import styles from "./Roommate_recurit.module.css";
import { useNavigate } from 'react-router-dom';
import Select from "react-select";

function Roommate_recruit(){
    const navigate = useNavigate();

    const navigateToWritePage = () => {
        navigate("/recruitment/roommate/write");
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>룸메이트 구인</h1>
            <div className={styles.btn_area}>
                <button className={styles.btn_type + " " + styles.btn_primary} type="submit" onClick={navigateToWritePage}>글쓰기</button>
            </div>
        </div>
    );
}

export default Roommate_recruit