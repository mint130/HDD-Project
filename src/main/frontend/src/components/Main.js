import './Main.css'
import jwt_decode from 'jwt-decode';
import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Notice from './Notice'
function Main(){
    const navigate = useNavigate();
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

    const logOut=async()=>{
        if(window.confirm('로그아웃 하시겠습니까?')){
            localStorage.removeItem("jwtToken");
            await axios.get('//localhost:8080/api/auth/signout', { headers: headers }).then((res)=>{
                //localStorage.removeItem("jwtToken");
                //console.log(res);
                //alert(res.data.message);
                //navigate('');
         });
        }
    }

    const navigateToMyPage = () => {
        navigate('/mypage')
    }


    const profileUrl="/img.png";
    const imageUrl="/wow_10.jpg";
    return (

        <div className="App">

            <div id ="container" className="container">
                <img className="photo" src={imageUrl}/>
                <div>
                    {!isAuthenticated ? (
                        <div className="login">
                        <form>
                            <p className="submit">
                                <button type="submit" value="로그인" className="submit_login">
                                    <a href="/api/auth/signin">로그인 바로가기</a>
                                </button>
                            </p>
                            <p className="find">
                                <a href="find.html">PW 찾기</a>
                            </p>
                            <p className="register">
                                <a href="/api/auth/signup/create">회원가입</a>
                            </p>
                        </form>
                        </div>
                    ) : (
                        <div className="logout">
                        <form className="profile">
                            <img src={profileUrl} className="profile_img"/>
                            <div className="profile_info">
                                <p>
                                    <h2 className="nickname">{userNickname}</h2> 님
                                </p>
                                <p>
                                    <h2>{userId}</h2>
                                </p>
                            </div>

                            <div className="profile_block">
                                <div className="profile_btn">
                                    <button onClick={logOut} value="로그아웃" className="submit_logout">
                                        로그아웃
                                    </button>
                                </div>
                                <div className="profile_btn">
                                        <button onClick={navigateToMyPage} value="마이페이지" className="submit_logout">
                                            마이페이지
                                        </button>
                                </div>



                            </div>
                        </form>
                        </div>

                    )}
                </div>
               <Notice/>
                <div className="card">
                    <h2>최근 게시물</h2>
                    <hr/>
                    <li>
                        <a className="article_c" href="projectrecruit.html">
                            <span class="major">구인</span> <span class="sub">프로젝트</span>
                        </a>
                        <a className="detail" href="projectrecruit.html">
                            <p className="title">컴퓨터공학과 / 3명 / 4학년</p>
                        </a>
                    </li>
                    <li>
                        <a className="article_c" href="roomrecruit.html">
                            <span class="major">구인</span> <span class="sub">룸메이트</span>
                        </a>
                        <a className="detail" href="roomrecruit.html">
                            <p className="title">여 / 1학년 / 2기숙사</p>
                        </a>
                    </li>
                    <li>
                        <a className="article_c" href="map.html">
                            <span className="major">지도</span> <span class="sub">맛집</span>
                        </a>
                        <a className="detail" href="map.html">
                            <p className="title">상호명 / 여기 진짜 맛있어요!</p>
                        </a>
                    </li>
                    <li>
                        <a className="article_c" href="promotion.html">
                            <span className="major">홍보</span>
                        </a>
                        <a className="detail" href="map.html">
                            <p className="title">컴퓨터공학과 / 졸업전시회</p>
                        </a>
                    </li>
                </div>
                <div className="icon">
                    <ul>
                        <h2>바로가기</h2>
                        <hr/>
                        <li><a href="https://www.hongik.ac.kr">홍익대학교</a></li>
                        <li><a href="https://cn.hongik.ac.kr/stud/">클래스넷</a></li>
                        <li><a href="https://at.hongik.ac.kr/stud01.jsp">전자출결</a></li>
                        <li><a href="http://dormitory.hongik.ac.kr/">기숙사</a></li>
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default Main