import React, {useState, useEffect} from "react";
import axios from "axios";
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from "./Signin.module.css";
//import {login} from '../actions/authActions';

function SignIn(){
    const{register, control, handleSubmit, watch, formState: {errors}}=useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data);

        axios.post('http://localhost:8080/api/auth/signin', {
            sid: data.sid,
            password: data.password,
        }, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                // 서버로부터 받은 응답에서 JWT 토큰을 추출합니다.
                const token = response.data.token;
               // const userInfo=response.data.user;

                // JWT 토큰을 로컬 스토리지에 저장합니다.
                localStorage.setItem('jwtToken', token);
                alert('로그인 성공');
                navigate("/");
            })
            .catch(error => {
                console.error('로그인 실패:', error);
                // 로그인 실패 처리
            });
    };
    const onError= errors=>console.log(errors);
    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div  className={styles.container}>
                <h1 className={styles.title}>로그인</h1>
                <div className={styles.content}>
                    <div className={styles.row}>
                        <div className={styles.list}>
                            <label htmlFor='sid'> 아이디(학번) </label>
                        </div>
                        <div className={styles.wrap}>
                            <div className={styles.form}>
                                <input id='sid' type='text' placeholder='학번을 입력하세요. 예)C123456'
                                       {...register("sid",
                                           {
                                               required:"아이디(학번)은 필수 입력입니다",
                                               //   pattern:{
                                               //      value:/[abcABC]{1}\d{6}/,
                                               //     message:"학번 형식에 맞지 않습니다",
                                               //  },
                                           })}
                                />
                            </div>
                            <div className={styles.expand}><span>{errors?.sid?.message}</span></div>
                        </div>
                        <div className={styles.right_area}></div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.list}><label htmlFor='password'>비밀번호</label></div>
                        <div className={styles.wrap}>
                            <div className={styles.form}>
                                <input id='password' type='password' placeholder='비밀번호를 입력하세요'
                                       {...register("password", {
                                           required:"비밀번호는 필수 입력입니다",
                                       })}
                                />
                            </div>
                            <div className={styles.expand}><span>{errors?.password?.message}</span></div>
                        </div>
                        <div className={styles.right_area}></div>
                    </div>
                    <div className={styles.btn_area}>
                        <button className={styles.btn_type + " " + styles.btn_primary} type="submit">로그인</button>
                    </div>
                </div>


            </div>

        </form>
    )

}

export default SignIn;