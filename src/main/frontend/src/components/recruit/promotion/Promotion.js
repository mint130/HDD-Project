import React, {useState, useEffect, useRef} from "react";
import axios, {postForm} from "axios";
import {useForm} from 'react-hook-form';
import styles from "../../sign_up/Signup.module.css";
import {useNavigate} from "react-router-dom";
import Promotion_map from "./Promotion_map";

function Promotion() {
    const navigate = useNavigate();
    const [promotionList, setPromotionList] = useState([]);
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
    };
    const getPromotionList = async () => {
        try{
            const resp = await axios.get('http://localhost:8080/promotion', { headers: headers });
            setPromotionList(resp.data);
            console.log(resp.data);
        }
        catch (error) {
            alert("로그인이 필요합니다.");
            navigate("/api/auth/signin");
        }
    }
    useEffect(() => {
        getPromotionList(); // 1) 게시글 목록 조회 함수 호출
    }, []);

    // 추가 버튼
    const navigateToAddPage = () => {
        navigate("/promotion/add");
    };
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>홍보</h1>
            <Promotion_map/>
            <button onClick={navigateToAddPage}>추가하기</button>
        </div>
    );
}

export default Promotion