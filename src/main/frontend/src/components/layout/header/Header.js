import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
    return (
        <header>
            <div className={styles.top_banner}>
                <div className={styles.loginContainer}>
                    <li>
                        <a href="/api/auth/signup/create">회원가입</a>
                    </li>
                    <li>
                        <a href="/api/auth/signin">로그인</a>
                    </li>
                </div>

                <li className={styles.title}>
                    <Link to="/">ㅎㄷㄷ</Link>
                </li>

            </div>
            <nav className={styles.navbar}>
                <div className={styles.menu}>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/map">지도</Link></li>
                        <li><Link to="/promotion">홍보</Link></li>
                        <li>
                            <a href="#">구인</a>
                            <ul>
                                <li><Link to="/projectrecruit">프로젝트 구인</Link></li>
                                <li><Link to="/roomrecruit">룸메이트 구인</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;