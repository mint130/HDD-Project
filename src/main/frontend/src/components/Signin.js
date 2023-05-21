import React, {useState, useEffect} from "react";
import axios from "axios";
import {useForm} from 'react-hook-form';

function SignIn(){
    const{register, control, handleSubmit, watch, formState: {errors}}=useForm();
    const onSubmit=data=>{
        console.log(data);
        //post 요청 보낼 url
        axios.post('http://localhost:8080/api/auth/signin', {
            sid: data.sid,
            password: data.password,
        }, {
            headers: { 'Content-type': 'application/json' }
        })
            .then(() => {
                alert('로그인 성공');
            })
            .catch(error => console.error(error));
    };
    const onError= errors=>console.log(errors);
    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div>
                <label htmlFor='sid'> 아이디(학번) </label>
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
                <span>{errors?.sid?.message}</span>
            </div>
            <div>
                <label htmlFor='password'>비밀번호</label>
                <input id='password' type='password' placeholder='비밀번호를 입력하세요'
                       {...register("password", {
                           required:"비밀번호는 필수 입력입니다",
                       })}
                />
                <span>{errors?.password?.message}</span>
            </div>
            <div>
                <button type="submit">로그인</button>
            </div>
        </form>
    )

}

export default SignIn;