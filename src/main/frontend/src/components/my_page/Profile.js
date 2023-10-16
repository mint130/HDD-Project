import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import jwt_decode from "jwt-decode";

const Title = styled.h2`
    padding-top: 20px;
    padding-bottom: 20px;
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    color: #000000;
`

function Profile() {
    const jwtToken = localStorage.getItem('jwtToken');
    const isAuthenticated = jwtToken !== null;
    const decodedToken = jwtToken ? jwt_decode(jwtToken) : null;
    const [userId, setUserId] = useState('');
    const [userNickname, setUserNickname] = useState('');
    const currentUserNickname = decodedToken ? decodedToken.nickname : null;
    const currentUserId = decodedToken ? decodedToken.sub : null;

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
    };

    useEffect(() => {
        if (isAuthenticated && decodedToken) {
            setUserId(currentUserId);
            setUserNickname(currentUserNickname);
        }
    }, [isAuthenticated, decodedToken]);

    return (
        <div>
            <Title>회원 정보</Title>
            <label>아이디</label>{userId}
            <label>닉네임</label>{userNickname}
        </div>
    );

}
export default Profile;