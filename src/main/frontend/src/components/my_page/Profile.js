import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Title = styled.h2`
    padding-top: 10px;
    padding-bottom: 10px;
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    color: #000000;
`
const Div = styled.div`
 display: inline-flex;
    width: 100%;
    padding-top: 16px;
    font-size: 16px;
`
const Label=styled.label`   
font-weight: 600;
    display: inline;
    width: 60px;
    `
function Profile() {
    const jwtToken = localStorage.getItem('jwtToken');
    const isAuthenticated = jwtToken !== null;
    const decodedToken = jwtToken ? jwt_decode(jwtToken) : null;
    const navigate = useNavigate();
    const [profile, setProfile]=useState({});
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
    };


    const getProfile=async ()=>{
        try{
            const resp = await axios.get('http://localhost:8080/api/auth/mypage/info', { headers: headers });
            console.log(resp.data);
            setProfile(resp.data);
        } catch (error) {
            alert("로그인이 필요합니다.");
            navigate("/api/auth/signin");
        }
    }
    useEffect(() => {
        getProfile();
    }, []);

    return (
        <div>
            <Title>회원 정보</Title>
            <Div><Label>아이디 </Label>{" "+profile.sid}</Div>
            <Div><Label>닉네임 </Label>{profile.nickname}</Div>
            <Div><Label>이메일 </Label>{profile.email}</Div>
        </div>
    );

}
export default Profile;