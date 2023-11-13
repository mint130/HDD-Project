import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import * as Style from "../style";


const Button=styled.button`
     display: block;
    width:100px;
    height: 30px;
    padding: 0 10px;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
    border-radius: 5px;
    color: #fff;
    border: solid 1px rgba(0,0,0,.08);
    background-color: #013B70;
        margin-left: auto;

`
const Title = styled.h2`
    padding-top: 10px;
    padding-bottom: 10px;
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    color: #000000;
`
const Row=styled.div`
    display: flex;
    padding: 5px;
`
const Div = styled.div`

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

    const handleClick=()=>{
        navigate("/mypage/update/password");
    }

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
            <Div>
                <Row>
                    <Label>아이디 </Label>{" "+profile.sid}
                </Row>
                <Row>
                    <Label>닉네임 </Label>{profile.nickname}
                </Row>
                <Row>
                    <Label>이메일 </Label>{profile.email}
                </Row>



                    <Button onClick={handleClick}>비밀번호 변경</Button>




            </Div>
        </div>
    );

}
export default Profile;