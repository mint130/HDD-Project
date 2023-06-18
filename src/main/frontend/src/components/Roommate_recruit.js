import React, {useState, useEffect, useRef} from "react";
import axios, {postForm} from "axios";
import Select from 'react-select';
import {useForm} from 'react-hook-form';
import styles from "./Roommate_recruit.module.css";


function Roommate_recruit() {
    const{register, control, setValue, handleSubmit, watch, formState: {errors}}=useForm();

    const gradeOptions = [
        { value: '1', label: '1학년' },
        { value: '2', label: '2학년' },
        { value: '3', label: '3학년' },
        { value: '4', label: '4학년' },
        { value: 'etc', label: '기타' },
    ];

    const handleGradeChange = (selectedOption) => {
        setValue('grade', selectedOption.value); // 선택된 학년 값을 필드에 설정
    };

    const dormitoryOptions=[
        {value: '1기숙사', label: '1기숙사'},
        {value: '2기숙사', label: '2기숙사'},
        {value: '3기숙사', label: '3기숙사'},
        {value: '자취', label: '자취'},
    ]
    const handleDormitoryChange = (selectedOption) => {
        setValue('dormitory', selectedOption.value); // 선택된 학년 값을 필드에 설정
    };
    const onSubmit=data=>console.log(data);
    const allFieldValues = watch(); // 모든 필드의 값 감시

    console.log(allFieldValues); // 값 변화를 콘솔에 출력
  //  console.log(watch("")); // watch input value by passing the name of it
    const onError= errors=>console.log(errors);
    return (
        <form onSubmit={handleSubmit(onSubmit,onError)}>
            <div className={styles.container}>
                <h1 className={styles.title}>룸메이트 구인</h1>
                <div className={styles.content}>
                    <div className={styles.row}>
                        <div className={styles.list}><label htmlFor="gender">성별</label></div>
                        <div className={styles.wrap}>
                                <input type="radio" {...register("gender", { required: true })} value="female"/> 여자
                                <input type="radio" {...register("gender", { required: true })} value="male"/> 남자
                        </div>

                    </div>
                    <div className={styles.row}>
                        <div className={styles.list}><label  htmlFor="grade">학년</label></div>
                        <Select
                            {...register('grade', { required: true })}
                            options={gradeOptions}
                            id="grade"
                            name="grade"
                            onChange={handleGradeChange}
                        />
                    </div>
                    <div className={styles.row}>
                        <div className={styles.list}><label htmlFor="dormitory">유형</label></div>
                        <Select
                            {...register('dormitory', {required: true})}
                            options={dormitoryOptions}
                            id="dormitory"
                            name="dormitory"
                            onChange={handleDormitoryChange}
                        />
                    </div>

                    <div className={styles.row}>
                        <div className={styles.list}><label htmlFor="nationality">국적</label></div>
                        <input type="radio" {...register("nationality", {required: true})} value="local"/> 내국인
                        <input type="radio" {...register("nationality", {required:true})} value="foreigner"/> 외국인
                    </div>
                    <div className={styles.row}>
                        <div className={styles.list}><label htmlFor="isSmoke">흡연여부</label></div>
                        <input type="checkbox" {...register("isSmoke", {required: true})}/> 흡연
                    </div>
                    <div className={styles.row}>
                        <div className={styles.list}><label htmlFor="pattern">생활 패턴</label></div>
                        <textarea
                            id="pattern"
                            {...register('pattern',{required: true})}>
                </textarea>
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

export default Roommate_recruit