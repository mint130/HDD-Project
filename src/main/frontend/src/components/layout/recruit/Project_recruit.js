import React, {useState, useEffect, useRef} from "react";
import axios, {postForm} from "axios";
import {useForm, Controller} from 'react-hook-form';
import styles from "./Roommate_recruit_write.module.css";
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import ko from "date-fns/locale/ko";
import Select from "react-select";

const gradeOptions = [
    { value: '1', label: '1학년' },
    { value: '2', label: '2학년' },
    { value: '3', label: '3학년' },
    { value: '4', label: '4학년' },
    { value: 'etc', label: '기타' },
];
function Project_recruit() {
    const{register, control, setValue, handleSubmit, watch, formState: {errors}}=useForm();
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    registerLocale("ko", ko);
    const onSubmit=data=>console.log(data);
    const onError= errors=>console.log(errors);
    const handleGradeChange = (selectedOption) => {
        setValue('grade', selectedOption.value); // 선택된 학년 값을 필드에 설정
    };
    return (
        <form onSubmit={handleSubmit(onSubmit,onError)}>
            <div className={styles.container}>
                <h1 className={styles.title}>프로젝트 구인</h1>
                <div className={styles.content}>
                    <div className={styles.row}>
                        <div className={styles.list}>
                            <label htmlFor="title">제목</label>
                        </div>
                        <div className={styles.wrap}>
                            <div className={styles.form}>
                            <input
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
                                    type="text"
                                    id="major"
                                    placeholder="과를 입력하세요"
                                    {...register('major')}
                                />과</div>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.list}>
                            <label htmlFor="personnel">인원</label>
                        </div>
                        <div className={styles.wrap}>
                            <div className={styles.form}>
                                <input
                                    type="number"
                                    id="personnel"
                                    placeholder="인원을 입력하세요"
                                    {...register('personnel')}
                                />명</div>
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
                            />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.list}>
                            <label htmlFor="grade">학년</label>
                        </div>
                        <Controller
                            control={control}
                            name="grade"
                            render={({field})=>(
                                <Select
                                    inputId="grade"
                                    options={gradeOptions}
                                    value={gradeOptions.find((option) => option.value === field.value)}
                                    onChange={(option) => field.onChange(option.value)}/>

                            )}
                        />
                    </div>
                    <div className={styles.row}>
                        <div className={styles.list}><label htmlFor="additional">추가 내용</label></div>
                        <textarea
                            id="additional"
                            {...register('additional')}>
                        </textarea>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.list}><label htmlFor="fileUpload">파일 첨부</label></div>
                        <input type="file" {...register("fileUpload")}/>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.list}><label htmlFor="openChatting">오픈 채팅</label></div>
                        <input type="url" {...register("openChatting", {required: true})}/>
                    </div>
                    <div className={styles.btn_area}><button className={styles.btn_type + " " + styles.btn_primary} type="submit">제출</button></div>
                </div>

            </div>
        </form>

    );
}

export default Project_recruit