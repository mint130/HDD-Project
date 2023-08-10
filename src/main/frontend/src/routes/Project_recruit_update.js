import React, { useEffect, useState } from 'react';
import {useForm, Controller} from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from "../components/recruit/project/Project_recruit_write.module.css";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "../components/recruit/datepicker.css";
const gradeOptions = [
    { value: 1, label: '1학년' },
    { value: 2, label: '2학년' },
    { value: 3, label: '3학년' },
    { value: 4, label: '4학년' },
    { value: 0, label: '기타' },
];

const Project_recruit_update=()=>{
    const navigate = useNavigate();
    const {boardId}=useParams();
    const{register, control, setValue, handleSubmit, watch, formState: {errors}}=useForm();
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [board, setBoard] = useState({
        boardId: boardId,
        title: '',
        major: '',
        num: 0,
        startDay: null,
        finishDay: null,
        grade: 0,
        info: '',
        openChat: ''
    });

    const {title, major, num, startDay, finishDay, grade, info, openChat}=board;

    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
    };

    const getBoard = async () => {
        try {
            const resp = await axios.get(`http://localhost:8080/recruitment/project/${boardId}`,{headers:headers});
            const boardData = resp.data;
            setBoard(boardData);
            setValue('title', boardData.title);
            setValue('major', boardData.major);
            setValue('num', boardData.num);
            setValue('grade', boardData.grade);
            setValue('info', boardData.info);
            setValue('openChat', boardData.openChat);
            //console.log(resp.data);
        } catch (error) {
            console.error('Error fetching board:', error);

        }
    };

    useEffect(() => {
        getBoard();
    }, []);


    const onSubmit=data=>{
        //console.log(data);
        //console.log(isSmoke);
        //헤더에 jwt token

        //console.log(startDate);
        //console.log(endDate);

        axios.post(`http://localhost:8080/recruitment/project/${boardId}/update`, {
            boardId: data.boardId,
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
                alert('프로젝트 구인글이 수정되었습니다');
                navigate(`/recruitment/project/${boardId}`);
            })
            .catch(error => console.error(error));
    };

    const onError= errors=>console.log(errors);

    const backToDetail=()=>{
        navigate(`/recruitment/project/${boardId}`);
    }

    const handleGradeChange = (selectedOption) => {
        setValue('grade', selectedOption.value); // 선택된 학년 값을 필드에 설정
    };


    return (

            <form onSubmit={handleSubmit(onSubmit,onError)}>
                <div className={styles.container}>

                    <h1 className={styles.title}>구인글 수정</h1>
                    <div className={styles.content}>
                        <div className={styles.row}>
                            <div className={styles.list}>
                                <label htmlFor="title">제목</label>
                            </div>
                            <div className={styles.wrap}>
                                <div className={styles.form}>
                                    <Controller
                                        name="title"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                className={styles.input}
                                                type="text"
                                                id="title"
                                                placeholder="제목을 입력하세요"
                                                {...field}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.list}>
                                <label htmlFor="major">과</label>
                            </div>
                            <div className={styles.wrap}>
                                <div className={styles.form}>
                                    <Controller
                                        name="major"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                className={styles.input}
                                                type="text"
                                                id="major"
                                                placeholder="과를 입력하세요"
                                                {...field}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.list}>
                                <label htmlFor="num">인원</label>
                            </div>
                            <div className={styles.wrap}>
                                <div className={styles.form}>
                                    <Controller
                                        name="num"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                className={styles.input}
                                                type="number"
                                                id="num"
                                                placeholder="인원을 입력하세요"
                                                {...field}
                                            />
                                        )}
                                    /></div>
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
                                    dateFormat="yyyy-MM-dd"
                                    isClearable={true}
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
                            <div className={styles.list}>
                                <label htmlFor="info">추가 내용</label>
                            </div>
                            <div className={styles.wrap}>
                                <Controller
                                    name="info"
                                    control={control}
                                    render={({ field }) => (
                                        <textarea
                                            className={styles.textarea}
                                            id="info"
                                            {...field}>
                                    </textarea>
                                    )}
                                />
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
                                    <Controller
                                        name="openChats"
                                        control={control}
                                        render={({ field }) => (
                                            <input type="url"className={styles.input}
                                                   {...register("openChat", {required: true})}/>
                                        )}
                                    /></div>

                            </div>

                        </div>

                        <div className={styles.btn_area}><button className={styles.btn_type + " " + styles.btn_primary} type="submit">수정</button></div>
                    </div>

                </div>
            </form>


    );
};

export default Project_recruit_update;