import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useForm} from 'react-hook-form';
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import styles from "../sign_up/Signup.module.css";

function Update_password(){
    const [email, setEmail] = useState(''); //이메일
    const [emailValid, setEmailValid]=useState(false); //유효한 이메일인지 확인
    const [emailVerified, setEmailVerified] = useState(false); //이메일 인증이 되었는지 안 되었는지
    const [verificationCode, setVerificationCode] = useState(''); //서버에서 보낸 인증 코드
    const [signification, setSignification]=useState(''); // 입력받은 인증코드
    const jwtToken = localStorage.getItem('jwtToken');
    const navigate = useNavigate();
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
    };

    const emailPattern = /^\S+(@g\.hongik\.ac\.kr)$/;
    const schema = Yup.object().shape({
        password: Yup.string()
            .required('비밀번호는 필수 입력입니다')
            .matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/, '영문 숫자 조합 8자리 이상'),
        passwordCheck: Yup.string()
            .required('비밀번호를 다시 입력해주세요')
            .oneOf([Yup.ref('password')], '비밀번호가 일치하지 않습니다.'),
        email:Yup.string()
            .required("이메일은 필수 입력입니다")
            .matches(emailPattern, '이메일 형식에 맞게 입력해주세요.')
    });

    const{register, handleSubmit,  formState: {errors}}=useForm({mode:'onChange',  resolver: yupResolver(schema)});

    function handleSignification(e){
        setSignification(e.target.value);


    }
    const handleEmailValid=(e)=>{
        const enteredEmail=e.target.value;
        setEmail(enteredEmail);

        //이메일 형식 유효성 검사
        //const emailPattern=/^\S+(@g\.hongik\.ac\.kr)$/;
        setEmailValid(emailPattern.test(enteredEmail));

    }
    const handleSendVerificationCode = () => {
        if(!emailValid){
            return;
        }

        console.log(email);

        axios.get(`http://localhost:8080/api/auth/mypage/email`, {
            headers:{headers},
            params: {

                email: email

            }
        })
            .then(response=>{
                alert('인증번호가 이메일로 전송되었습니다.');
                setEmailVerified(true);
                console.log(response); //data: 인증번호 , status: 200,
                setVerificationCode(response.data);
            })
            .catch((error) => console.error(error));


        setEmailVerified(true);

    };
    const handleVerificationCodeSubmit = (data) => {
        console.log(signification); //현재 내가 입력한것..?
        console.log(verificationCode); //서버에서 보낸 인증코드.. 활성화되어있다..
        // verificationCode.toString();
        if (signification == verificationCode) {

            alert('이메일 인증이 완료되었습니다.');
        } else {
            alert('인증번호가 올바르지 않습니다.');
        }

    }

    //console.log(watch());
    const onSubmit=data=>{
        console.log(data);
        const PasswordData={
            password: data.password
        }

        //post 요청 보낼 url
        axios.post('http://localhost:8080/api/auth/mypage/update/password', PasswordData, {
            headers: headers
        })
            .then(() => {
                alert('비밀번호 변경이 완료되었습니다.');
                navigate('/');
            })
            .catch(error => console.error(error));
    };
    //여기서, 사용자에게 입력을 받을 Input 태그에 register 함수를 등록하고,
    // handleSubmit 함수를 이용하여 form 요소에서 발생하는 submit 이벤트를 처리해준다.

    const onError= errors=>console.log(errors);
    return(
        <form onSubmit={handleSubmit(onSubmit,onError)}>
            <div className={styles.container}>
                <h1 className={styles.title}>비밀번호 변경</h1>
                <div className={styles.content}>
                    <div className={styles.row}>
                        <div className={styles.list}>
                            <label htmlFor="email">이메일</label>
                        </div>
                        <div className={styles.wrap}>
                            <div className={styles.form}>
                                <input className={styles.input} id="email" type="text" placeholder="예) abc123@g.hongik.ac.kr"
                                       {...register("email", {required: "이메일은 필수 입력입니다",
                                           pattern: {
                                               value: /^\S+(@g.hongik.ac.kr)/,
                                               message: '이메일 형식에 맞게 입력해주세요.',
                                           },
                                       })}
                                       value={email} onChange={handleEmailValid}
                                />
                            </div>
                            <div className={styles.expand}>
                                <span>{errors?.email?.message}</span>
                            </div>
                        </div>
                        <div className={styles.right_btn_area}>
                            {!emailVerified && (

                                <button type="button"
                                        className={`${styles.btn_verify} ${emailValid ? styles.btn_secondary : styles.btn_disable}`}
                                        onClick={handleSendVerificationCode} disabled={!emailValid}>
                                    인증번호 받기
                                </button>
                            )}
                        </div>
                    </div>
                    {emailVerified && (
                        <div className={styles.row}>
                            <div className={styles.list}>
                                <label htmlFor="signification">인증번호 입력</label>
                            </div>
                            <div className={styles.wrap}>
                                <div className={styles.form}>
                                    <input className={styles.input}
                                        id="signification"
                                        type="number"
                                        placeholder="인증번호를 입력하세요"
                                        value={signification}
                                        onChange={handleSignification}
                                        required
                                    />
                                </div>
                            </div>
                            <div className={styles.right_btn_area}>
                                <button type="submit"
                                        className={`${styles.btn_verify} ${verificationCode ? styles.btn_secondary : styles.btn_disable}`}
                                        onClick={handleVerificationCodeSubmit}
                                        disabled={!verificationCode}>
                                    인증번호 입력
                                </button>
                            </div>
                        </div>)}
                    <div className={styles.row}>
                        <div className={styles.list}>
                            <label htmlFor='password'>비밀번호</label>
                        </div>
                        <div className={styles.wrap}>
                            <div className={styles.form}>
                                <input className={styles.input} id='password' type='password' placeholder='비밀번호를 입력하세요'
                                       {...register("password")}
                                />
                            </div>
                            <div className={styles.expand}>
                                <span>{errors?.password?.message}</span>
                            </div>

                        </div>
                        <div className={styles.right_btn_area}></div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.list}>
                            <label htmlFor='passwordCheck'>비밀번호 재확인</label>
                        </div>
                        <div className={styles.wrap}>
                            <div className={styles.form}>
                                <input className={styles.input} id='passwordCheck' type='password' placeholder='비밀번호를 다시 입력하세요'
                                       {...register('passwordCheck')}
                                />
                            </div>
                            <div className={styles.expand}>
                                <span>{errors?.passwordCheck?.message}</span>
                            </div>
                        </div>
                        <div className={styles.right_btn_area}></div>
                    </div>



                        <div className={styles.expand}>
                            <span>{errors?.major?.message}</span>
                        </div>

                        <div className={styles.right_btn_area}></div>

                    </div>
                    <div className={styles.btn_area}>
                        <button className={styles.btn_type + " " + styles.btn_primary} type='submit' disabled={!verificationCode}>비밀번호 변경</button>
                    </div>
                </div>
        
        </form>
    );


}
export default Update_password;