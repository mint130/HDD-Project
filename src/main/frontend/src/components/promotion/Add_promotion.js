import React, {useState, useEffect, useRef} from "react";
import axios, {postForm} from "axios";
import {useForm} from 'react-hook-form';
import styles from "../sign_up/Signup.module.css";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import {useNavigate} from "react-router-dom";
import File_upload from "../File_upload";
import * as Style from "../style";

function Add_Promotion() {
    const navigate = useNavigate();
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'multipart/form-data',
    };

    const{register,  setValue, handleSubmit, formState: {errors}}=useForm();
    const [uploadImage, setUploadImage]=useState(null);

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const handleFileUpload = (fileInfo)=>{
        setUploadImage(fileInfo);

    }

    const addPromotion=data=>{
        const formData=new FormData();
        const promotionData = {
            major: data.major,
            title: data.title,
            start: startDate,
            finish: endDate,
            hall: data.hall,
            etc: data.etc,
        }
        //이미지 객체 추가
        formData.append('file', uploadImage.file);
        //프로모션 객체 추가
        formData.append('promotion',
            new Blob([JSON.stringify(promotionData)], {type: "application/json"})
        );
        //파일 이름 추가
        formData.append('nameFile', uploadImage.imageName);


        //formData 조회코드
        for (let key of formData.keys()) {
            console.log(key, ":", formData.get(key));
        }

        //전송 코드
        axios.post('http://localhost:8080/promotion/add', formData, {
            headers: headers
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
            <Style.Container>
                <Style.Title>홍보 추가</Style.Title>
                <Style.Content>
                    <Style.Row>
                        <Style.List>
                            <label>전공</label>
                        </Style.List>
                        <Style.Form>
                            <input type="text"  {...register('major')}/>
                        </Style.Form>

                    </Style.Row>
                    <Style.Row>
                        <Style.List>
                            <label>제목</label>
                        </Style.List>
                        <Style.Form>
                            <input type="text" {...register('title')}/>
                        </Style.Form>

                    </Style.Row>
                    <Style.Row>
                        <Style.List>
                            <label>기간</label>
                        </Style.List>

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
                    </Style.Row>
                    <Style.Row>
                        <Style.List>
                            <label>건물 이름</label>
                        </Style.List>
                        <Style.Form>
                            <input type="text" {...register('hall')}/>
                        </Style.Form>

                    </Style.Row>
                    <Style.Row>
                        <Style.List>
                            <label>위치</label>
                        </Style.List>
                        <Style.Form>
                            <input type="text" {...register('etc')}/>
                        </Style.Form>

                    </Style.Row>
                    <Style.Row>
                        <Style.List>
                            <label>파일 첨부</label>
                        </Style.List>
                        <Style.Wrap>
                            <File_upload onFileUpload={handleFileUpload}/>
                        </Style.Wrap>
                    </Style.Row>

                    <Style.ButtonArea>
                        <Style.Button type="submit">제출하기</Style.Button>
                    </Style.ButtonArea>
                </Style.Content>

            </Style.Container>
        </form>
    );
}

export default Add_Promotion