import React, {useState, useEffect, useRef} from "react";
import axios, {postForm} from "axios";
import {useForm} from 'react-hook-form';
import styles from "../sign_up/Signup.module.css";
import DatePicker from "react-datepicker";
import {useNavigate} from "react-router-dom";

function Add_Promotion() {
    const navigate = useNavigate();
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
    };
    const{register,  setValue, handleSubmit, formState: {errors}}=useForm();
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const addPromotion=data=>{
        console.log(data);
        //console.log(startDate, endDate);
        axios.post('http://localhost:8080/promotion/add', {
            major: data.major,
            title: data.title,
            start: startDate,
            finish: endDate,
            hall: data.hall,
            etc: data.etc

        }, {
            headers: headers,
        })
            .then(() => {
                alert('홍보글이 등록되었습니다');
                navigate('/promotion');
            })
            .catch(error => console.error(error));
    }
    const onError= errors=>console.log(errors);

    return (
        <form onSubmit={handleSubmit(addPromotion,onError)}>
            <div className={styles.container}>
                <h1 className={styles.title}>홍보 추가</h1>
                <div>
                    <label>전공</label>
                    <input type="text"  {...register('major')}/>
                </div>
                <div>
                    <label>제목</label>
                    <input type="text" {...register('title')}/>
                </div>
                <div>
                    <label>기간</label>
                    <DatePicker
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(update) => {
                            setDateRange(update);
                        }}
                        isClearable={true}
                        dateFormat="yyyy-MM-dd"
                    />
                </div>
                <div>
                    <label>건물 이름</label>
                    <input type="text" {...register('hall')}/>
                </div>
                <div>
                    <label>위치</label>
                    <input type="text" {...register('etc')}/>
                </div>

                <button type="submit">제출하기</button>
            </div>
        </form>
    );
}

export default Add_Promotion