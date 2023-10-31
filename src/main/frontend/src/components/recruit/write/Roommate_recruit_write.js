import React, {useState, useEffect, useRef} from "react";
import axios, {postForm} from "axios";
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import styles from "./Roommate_recruit_write.module.css";
import File_upload from "../../File_upload";
import * as Style from "../../style";

const gradeOptions = [
    { value: 1, label: '1학년' },
    { value: 2, label: '2학년' },
    { value: 3, label: '3학년' },
    { value: 4, label: '4학년' },
    { value: 0 , label: '기타' },
];
const dormitoryOptions=[
    {value: 1, label: '1기숙사'},
    {value: 2, label: '2기숙사'},
    {value: 3, label: '3기숙사'},
    {value: 0, label: '자취'},
]
function Roommate_recruit_write() {
    const{register, control, setValue, handleSubmit, watch, formState: {errors}}=useForm();
    const navigate = useNavigate();
    const [isSmoke, setIsSmoke]=useState();
    const [uploadImage, setUploadImage]=useState(null);
    const handleFileUpload = (fileInfo)=>{
        setUploadImage(fileInfo);

    }
    const handleGradeChange = (selectedOption) => {
        setValue('grade', selectedOption.value); // 선택된 학년 값을 필드에 설정
    };

    const handleDormitoryChange = (selectedOption) => {
        setValue('dormType', selectedOption.value); // 선택된 기숙사 값을 필드에 설정
    };

    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'multipart/form-data',
    };

    const onSubmit=data=>{
        const formData=new FormData();
        const isKorean = Boolean(data.korean);
        const roommateData = {
            sex: data.sex,
            grade: data.grade,
            dormType: data.dormType,
            korean: isKorean,
            smoke: data.smoke,
            pattern: data.pattern,
            info: data.info,
            created: new Date(),
            openChat: data.openChat
        }

        if(uploadImage!=null && uploadImage.file)
        {
            //이미지 객체 추가
            formData.append('file', uploadImage.file);
            formData.append('nameFile', uploadImage.imageName);
        }

        formData.append('request',
            new Blob([JSON.stringify(roommateData)], {type: "application/json"})
        );
        //파일 이름 추가
        // formData.append('nameFile', uploadImage.imageName);

        for (let key of formData.keys()) {
            console.log(key, ":", formData.get(key));
        }

        //post 요청 보낼 url
       // console.log(jwtToken);
        axios.post('http://localhost:8080/recruitment/roommate/write', formData, {
            headers: headers,
        })
            .then(() => {
                alert('룸메이트 구인글이 등록되었습니다');
                navigate('/recruitment/roommate');
            })
            .catch(error => console.error(error));
    };

    const onError= errors=>console.log(errors);
    return (

        <form onSubmit={handleSubmit(onSubmit,onError)}>
            <div className={styles.container}>
                <h1 className={styles.title}>구인글 작성</h1>
                <div className={styles.content}>
                    <div className={styles.row}>
                        <div className={styles.list}>
                            <label htmlFor="sex">성별</label>
                        </div>
                        <div className={styles.wrap}>

                                <div className={styles.radio_row}>
                                    <input type="radio" {...register("sex", { required: true })} value="F"/> 여자
                                </div>
                                <div className={styles.radio_row}>
                                    <input  type="radio" {...register("sex", { required: true })} value="M"/> 남자
                                </div>

                        </div>

                    </div>
                    <div className={styles.row}>
                        <div className={styles.list}><label  htmlFor="grade">학년</label></div>
                        <div className={styles.wrap}>
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

                    </div>
                    <div className={styles.row}>
                        <div className={styles.list}><label htmlFor="dormType">유형</label></div>
                        <div className={styles.wrap}>
                            <div className={styles.select}>
                                <Select

                                    {...register('dormType', {required: true})}
                                    options={dormitoryOptions}
                                    placeholder="유형을 선택해주세요"
                                    id="dormType"
                                    name="dormType"
                                    onChange={handleDormitoryChange}
                                />
                            </div>

                        </div>

                    </div>

                    <div className={styles.row}>
                        <div className={styles.list}><label htmlFor="korean">국적</label></div>
                        <div className={styles.radio_row}>
                            <input type="radio" value={true} {...register("korean", {required: true})}/> 내국인
                        </div>
                        <div className={styles.radio_row}>
                            <input type="radio" value={false} {...register("korean", {required:true})}/> 외국인
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.list}>
                            <label htmlFor="smoke">흡연여부</label></div>
                        <div className={styles.radio_row}>
                            <input type="checkbox"
                                checked={isSmoke} onChange={setIsSmoke}{...register("smoke" )}
                            /> 흡연
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.list}><label htmlFor="pattern">생활 패턴</label></div>
                        <div className={styles.wrap}>
                         <textarea
                             className={styles.textarea}
                             id="pattern"
                             {...register('pattern',{required: true})}>
                        </textarea>
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
                        <div className={styles.wrap}>
                            <File_upload onFileUpload={handleFileUpload}/>
                        </div>

                    </div>
                    <div className={styles.row}>
                        <div className={styles.list}>
                            <label htmlFor="openChat">오픈 채팅</label>
                        </div>
                        <div  className={styles.wrap}>
                            <div className={styles.form}>
                                <input className={styles.input} type="url" placeholder="링크를 입력하세요" {...register("openChat", {required: true})}/>
                            </div>

                        </div>
                    </div>
                    <div className={styles.btn_area}>
                        <button className={styles.btn_type + " " + styles.btn_primary} type="submit">제출</button>
                    </div>
                </div>

            </div>

        </form>

    );

}

export default Roommate_recruit_write