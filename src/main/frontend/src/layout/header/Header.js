import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
    return (
        <header>
            <div className={styles.top_banner}>


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
                                <li><Link to="/recruitment/project">프로젝트 구인</Link></li>
                                <li><Link to="/recruitment/roommate">룸메이트 구인</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;