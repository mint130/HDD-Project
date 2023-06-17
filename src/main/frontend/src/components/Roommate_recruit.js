import React, {useState, useEffect, useRef} from "react";
import axios, {postForm} from "axios";
import Select from 'react-select';
import {useForm} from 'react-hook-form';

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
            <div>
                <h2>룸메이트 구인</h2>
            </div>
            <div>
                <label htmlFor="gender">성별</label>
                <input type="radio" {...register("gender", { required: true })} value="female"/> 여자
                <input type="radio" {...register("gender", { required: true })} value="male"/> 남자
            </div>
            <div>
                <label  htmlFor="grade">학년</label>
                <Select
                    {...register('grade', { required: true })}
                    options={gradeOptions}
                    id="grade"
                    name="grade"
                    onChange={handleGradeChange}
                />
            </div>
            <div>
                <label htmlFor="dormitory">유형</label>
                <Select
                    {...register('dormitory', {required: true})}
                    options={dormitoryOptions}
                    id="dormitory"
                    name="dormitory"
                    onChange={handleDormitoryChange}
                />
            </div>

            <div>
                <label htmlFor="nationality">국적</label>
                <input type="radio" {...register("nationality", {required: true})} value="local"/> 내국인
                <input type="radio" {...register("nationality", {required:true})} value="foreigner"/> 외국인
            </div>
            <div>
                <label htmlFor="isSmoke">흡연여부</label>
                <input type="checkbox" {...register("isSmoke", {required: true})}/> 흡연
            </div>
            <div>
                <label htmlFor="pattern">생활 패턴</label>
                <textarea
                    id="pattern"
                    {...register('pattern',{required: true})}>
                </textarea>
            </div>
            <div>
                <label htmlFor="additional">추가 내용</label>
                <textarea
                    id="additional"
                    {...register('additional')}>
                </textarea>
            </div>
            <div>
                <label htmlFor="fileUpload">파일 첨부</label>
                <input type="file" {...register("fileUpload")}/>
            </div>
            <div>
                <label htmlFor="openChatting">오픈 채팅</label>
                <input type="url" {...register("openChatting", {required: true})}/>
            </div>
            <button type="submit">제출</button>
        </form>

    );

}

export default Roommate_recruit