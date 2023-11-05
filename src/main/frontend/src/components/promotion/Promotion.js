import React, {useState, useEffect, useRef} from "react";
import axios, {postForm} from "axios";
import {useNavigate} from "react-router-dom";
import Promotion_item from "./Promotion_item";
import Promotion_map from "./Promotion_map";
import styled from "styled-components";


const Div = styled.div`
    width: 900px;
    margin: 0px auto;
    padding-bottom: 120px;
`

const Title = styled.h1`
    padding-top: 20px;
    padding-bottom: 20px;
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    color: #000000;
`
const H2 = styled.h2`
    padding-top: 20px;
    padding-bottom: 20px;
`
function Promotion() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [promotionList, setPromotionList] = useState([]);
    const [hallName, setHallName]=useState('');
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
    };
    const getAllPromotionList = async () => {
        try{
            const resp = await axios.get('http://localhost:8080/promotion', { headers: headers });
            console.log(resp.data);
            setPromotionList(resp.data);
            setLoading(false);
            //console.log(resp.data);
        }
        catch (error) {
            alert("로그인이 필요합니다.");
            navigate("/api/auth/signin");
        }
    }
    const getPromotionList= async (hallId)=>{
        try{
            console.log(hallId);
            setHallName(hallId);
            const resp=await axios.get('http://localhost:8080/promotion',{
                params:{
                    hall: hallId
                },
                headers: headers}
            );
            console.log(resp.data);
            setPromotionList(resp.data);
        }
        catch (e) {
            console.log(e);
        }

    }

    useEffect(() => {
        getAllPromotionList(); // 1) 게시글 목록 조회 함수 호출
    }, []);

    // 추가 버튼
    const navigateToAddPage = () => {
        navigate("/promotion/add");
    };
    return (
        <Div>
            <Title>홍보</Title>
            <Promotion_map onClick={getPromotionList}/>
            {hallName!=null?<h1>{hallName+"동"}</h1>:<h1>전체</h1>}
            {loading? <h2>Loading...</h2>:
                (promotionList.length!=0?
                    promotionList.map(
                        (promotion)=>(
                            <Promotion_item promotion={promotion}/>
                        )
                    ): <H2>등록된 게시물이 없습니다.</H2>
                )
            }
        </Div>
    );
}

export default Promotion