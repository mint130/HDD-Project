import React, {useState, useEffect, useRef} from "react";
import axios, {postForm} from "axios";
import {useForm, Controller} from 'react-hook-form';
import styles from "./Project_recruit_write.module.css";
import DatePicker, {registerLocale} from "react-datepicker";
import { useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import Select from "react-select";
import "../datepicker.css";

const gradeOptions = [
    { value: 1, label: '1학년' },
    { value: 2, label: '2학년' },
    { value: 3, label: '3학년' },
    { value: 4, label: '4학년' },
    { value: 0, label: '기타' },
];
function Project_recruit_write() {
    const{register, control, setValue, handleSubmit, watch, formState: {errors}}=useForm();
    const [dateRange, setDateRange] = useState([null, null]);
    const navigate = useNavigate();
    const [startDate, endDate] = dateRange;

    registerLocale("ko", ko);

    const onSubmit=data=>{
        console.log(data);
        //console.log(isSmoke);
        //헤더에 jwt token
        const jwtToken = localStorage.getItem('jwtToken');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`,
        };
        console.log(startDate);
        console.log(endDate);

        //post 요청 보낼 url
        // console.log(jwtToken);
        axios.post('http://localhost:8080/recruitment/project/write', {

            title: data.title,
            major: data.major,
            num: parseInt(data.num),
            startDay: startDate,
            finishDay: endDate,
            grade: data.grade,
            info: data.info,
            openChat: data.openChat
        }, {
            headers: headers,
        })
            .then(() => {
                alert('프로젝트 구인글이 등록되었습니다');
                navigate('/recruitment/project');
            })
            .catch(error => console.error(error));
    };

    const onError= errors=>console.log(errors);
    
    const handleGradeChange = (selectedOption) => {
        setValue('grade', selectedOption.value); // 선택된 학년 값을 필드에 설정
    };
    return (
        <form onSubmit={handleSubmit(onSubmit,onError)}>
            <div className={styles.container}>
                <h1 className={styles.title}>구인글 작성</h1>
                <div className={styles.content}>
                    <div className={styles.row}>
                        <div className={styles.list}>
                            <label htmlFor="title">제목</label>
                        </div>
                        <div className={styles.title_wrap}>
                            <div className={styles.form}>
                                <input
                                    className={styles.input}
                                    type="text"
                                    id="title"
                                    placeholder="제목을 입력하세요"
                                    {...register('title')}
                                /></div>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.list}>
                            <label htmlFor="major">과</label>
                        </div>
                        <div className={styles.wrap}>
                            <div className={styles.form}>
                                <input
                                    className={styles.input}
                                    type="text"
                                    id="major"
                                    placeholder="과를 입력하세요"
                                    {...register('major')}
                                /></div>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.list}>
                            <label htmlFor="num">인원</label>
                        </div>
                        <div className={styles.wrap}>
                            <div className={styles.form}>
                                <input
                                    className={styles.input}
                                    type="number"
                                    id="num"
                                    placeholder="인원을 입력하세요"
                                    {...register('num')}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.list}>
                            <label htmlFor="period">기간</label>
                        </div>
                        <div className={styles.wrap}>
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
                    </div>
                    <div className={styles.row}>
                        <div className={styles.list}>
                            <label htmlFor="grade">학년</label>
                        </div>
                        <div className={styles.select}>
                        <Select
                            {...register('grade', { required: true })}
                            placeholder="학년을 선택해주세요"
                            options={gradeOptions}
                            id="grade"
                            name="grade"
                            onChange={handleGradeChange}
                        />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.list}><label htmlFor="info">추가 내용</label></div>
                        <div className={styles.wrap}>
                        <textarea
                            className={styles.textarea}
                            id="info"
                            {...register('info')}>
                        </textarea>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.list}><label htmlFor="fileUpload">파일 첨부</label></div>
                        <input type="file" {...register("fileUpload")}/>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.list}><label htmlFor="openChat">오픈 채팅</label></div>
                        <div className={styles.wrap}>
                            <div className={styles.form}>
                                <input type="url" className={styles.input} {...register("openChat", {required: true})}/>
                            </div>
                        </div>

                    </div>
                    <div className={styles.btn_area}><button className={styles.btn_type + " " + styles.btn_primary} type="submit">제출</button></div>
                </div>

            </div>
        </form>

    );
}

export default Project_recruit_write