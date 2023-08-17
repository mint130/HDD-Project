import './Main.css'
import jwt_decode from 'jwt-decode';
import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


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
    const [val1, setVal1] = useState("");
    const {coll,dept} = {coll:[ {coll:'학생공지'},
            {coll:'공과대학'},{coll:'건축도시대학'},{coll:'경영대학'},{coll:'문과대학'},{coll:'법과대학'},{coll:'사범대학'},
            {coll:'미술대학'},{coll:'경제학부'},{coll:'공연예술학부'},{coll:'디자인경영융합'},{coll:'자율전공'}],

        dept:[{coll:'학생공지', dept:''},{coll:'공과대학', dept:'선택'},
            {coll:'공과대학', dept:'건설환경공학과'},
            {coll:'공과대학', dept:'전자전기공학부'},{coll:'공과대학', dept:'컴퓨터공학과'},{coll:'공과대학', dept:'산업데이터공학과'},
            {coll:'공과대학', dept:'신소재공학전공'},{coll:'공과대학', dept:'화학공학전공'}, {coll:'공과대학', dept:'기계시스템디자인공학과'},
            {coll:'건축도시대학', dept:'건축학부'},{coll:'경영대학', dept:'경영학부'},{coll:'문과대학', dept:'선택'},
            {coll:'문과대학', dept:'영어영문학과'},{coll:'문과대학', dept:'독어독문학과'},{coll:'문과대학', dept:'불어불문학과'},
            {coll:'문과대학', dept:'국어국문학과'},{coll:'법과대학', dept:'법학부'},{coll:'사범대학', dept:'선택'},
            {coll:'사범대학', dept:'수학교육과'}, {coll:'사범대학', dept:'국어교육과'},{coll:'사범대학', dept:'영어교육과'},
            {coll:'사범대학', dept:'역사교육과'}, {coll:'사범대학', dept:'교육학과'},{coll:'미술대학', dept:'선택'},
            {coll:'미술대학', dept:'동양화과'}, {coll:'미술대학', dept:'회화과'}, {coll:'미술대학', dept:'판화과'},
            {coll:'미술대학', dept:'조소과'},{coll:'미술대학', dept:'목조형가구학과'},{coll:'미술대학', dept:'예술학과'},
            {coll:'미술대학', dept:'금속조형디자인과'}, {coll:'미술대학', dept:'도예유리과'}, {coll:'미술대학', dept:'섬유미술패션디자인과'},
            {coll:'경제학부', dept:'경제학전공'},{coll:'공연예술학부', dept:'선택'},{coll:'공연예술학부', dept:'뮤지컬전공'}, {coll:'공연예술학부', dept:'실용음악전공'},{coll:'디자인경영융합', dept:'디자인경영융합'},{coll:'자율전공', dept:'캠퍼스자율전공'}
        ]};


    function setVal2(e){
        document.querySelector('h4').innerHTML = e;
    }
    function noticeC(e){
        document.querySelector('h4').innerHTML = e;
    }
    const profileUrl="/img.png";
    return (

        <div className="App">

            <div id ="container" className="container">
                <div className="photo">
                    photo
                </div>
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
                                        <button  value="마이페이지" className="submit_logout">
                                            마이페이지
                                        </button>
                                </div>



                            </div>
                        </form>
                        </div>

                    )}
                </div>
                <div className="notice">
                    <div className="form-group">
                        <h2>공지사항</h2>
                        <select onChange={(e)=>setVal1(e.target.value)} onClick={(e)=>noticeC(e.target.value)}>
                            {coll.map((el)=>(
                                <option key={el.coll} value={el.coll}>
                                    {el.coll}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group2">
                        <select onChange={(e)=>setVal2(e.target.value)}>
                            {dept.filter((el)=>el.coll===val1)
                                .map((el)=>(
                                    <option key={el.dept} value={el.dept} >{el.dept}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <hr/>
                    <div className="article_n">
                        <h4>학생공지</h4>
                        <li>
                            <a href="https://www.hongik.ac.kr/contents/www/cor/studentsno.html">
                                2023학년도 하계계절학기 학점교류 신청 안내(건국대학교)
                            </a>
                        </li>
                        <li>
                            <a href="https://www.hongik.ac.kr/contents/www/cor/studentsno.html">
                                2023학년도 하계계절학기 학점교류 신청 안내(서울시립대학교)
                            </a>
                        </li>
                        <li>
                            <a  href="https://www.hongik.ac.kr/contents/www/cor/studentsno.html">
                                2023학년도 하계계절학기 학점교류 신청 안내(숙명여자대학교)
                            </a>
                        </li>
                        <li>
                            <a href="https://www.hongik.ac.kr/contents/www/cor/studentsno.html">
                                [서울장학재단] 2023년 독립유공자 후손 장학금 장학생 선발 공고 안내
                            </a>
                        </li>
                        <li>
                            <a href="https://www.hongik.ac.kr/contents/www/cor/studentsno.html">
                                [훈련생 모집] K-Digital Training 무료 취업 연계 교육 훈련생 모집
                            </a>
                        </li>
                    </div>
                </div>
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