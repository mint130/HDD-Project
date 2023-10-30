import React, { useEffect, useState } from 'react';
import {useForm, Controller} from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from "../components/recruit/write/Roommate_recruit_write.module.css";
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
const dormitoryOptions=[
    {value: 1, label: '1기숙사'},
    {value: 2, label: '2기숙사'},
    {value: 3, label: '3기숙사'},
    {value: 0, label: '자취'},
]
const Roommate_recruit_update=()=>{
    const navigate = useNavigate();
    const {boardId}=useParams();
    const{register, control, setValue, handleSubmit, watch, formState: {errors}}=useForm();
    const [isSmoke, setIsSmoke]=useState();
    const [board, setBoard] = useState({
        boardId: boardId,
        dormType: 0,
        korean: true,
        sex: '',
        smoke: isSmoke,
        pattern:'',
        grade: 0,
        info: '',
        openChat: ''
    });
    const {dormType, korean, sex, smoke, grade,pattern, info, openChat}=board;
    const getBoard = async () => {
        try {
            const resp = await axios.get(`http://localhost:8080/recruitment/roommate/${boardId}`,{headers:headers});
            const boardData = resp.data.board.first;
            setBoard(boardData);
            setValue('pattern', boardData.pattern);
            setValue('dormType', boardData.dormType);
            setValue('smoke', boardData.smoke);
            //setIsSmoke(boardData.smoke);
            setValue('sex', boardData.sex);
            setValue('korean',boardData.korean);
            setValue('grade', boardData.grade);
            setValue('info', boardData.info);
            setValue('openChat', boardData.openChat);
            console.log(resp.data);
        } catch (error) {
            console.error('Error fetching board:', error);
        }
    };
    const onError= errors=>console.log(errors);

    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
    };
    useEffect(() => {
        getBoard();
        //setIsSmoke(board.smoke);
    }, []);


    const onSubmit=data=>{
        console.log(data);
        axios.post(`http://localhost:8080/recruitment/roommate/${boardId}/update`, {
            boardId: data.boardId,
            pattern: data.pattern,
            dormType: data.dormType,
            smoke: data.smoke,
            sex: data.sex,
            korean: data.korean,
            grade: data.grade,
            info: data.info,
            openChat: data.openChat
        }, {
            headers: headers,
        })
            .then(() => {
                alert('룸메이트 구인글이 수정되었습니다');
                navigate(`/recruitment/roommate/${boardId}`);
            })
            .catch(error => console.error(error));
    };
    const handleGradeChange = (selectedOption) => {
        setValue('grade', selectedOption.value); // 선택된 학년 값을 필드에 설정
    };
    const handleDormitoryChange = (selectedOption) => {
        setValue('dormType', selectedOption.value); // 선택된 기숙사 값을 필드에 설정
    };

    return (
        <form onSubmit={handleSubmit(onSubmit,onError)}>
            <div className={styles.container}>
                <h1 className={styles.title}>구인글 수정</h1>
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
                        <div className={styles.list}>
                            <label htmlFor="grade">학년</label>
                        </div>
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
                        <div className={styles.list}>
                            <label htmlFor="dormType">유형</label>
                        </div>
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
                          <div className={styles.list}>
                              <label htmlFor="korean">국적</label>
                          </div>
                          <div className={styles.wrap}>
                              <div className={styles.radio_row}>
                                  <Controller
                                  name="korean"
                                  control={control}
                                  render={({field})=>(
                                      <input
                                          type="radio"
                                          value={true}
                                          checked={field.value === true}
                                          onChange={() => field.onChange(true)}
                                      />
                                  )}
                                  /> 내국인
                              </div>
                              <div className={styles.radio_row}>
                                  <Controller
                                      name="korean"
                                      control={control}
                                      render={({field})=>(
                                          <input
                                              type="radio"
                                              value={false}
                                              checked={field.value === false}
                                              onChange={() => field.onChange(false)}
                                          />
                                      )}
                                  /> 외국인
                              </div>
                          </div>
                      </div>
                       <div className={styles.row}>
                           <div className={styles.list}>
                               <label htmlFor="smoke">흡연</label>
                           </div>
                           <div className={styles.radio_row}>
                               <Controller
                                   name="smoke"
                                   control={control}
                                   render={({ field }) => (
                                       <input
                                           checked={watch('smoke')}
                                           onChange={(e) => field.onChange(e.target.checked)}
                                           type="checkbox"
                                           id="smoke"
                                           {...field}
                                       />
                                   )}
                               /> 흡연
                           </div>
                       </div>
                    <div className={styles.row}>
                        <div className={styles.list}>
                            <label htmlFor="pattern">생활 패턴</label>
                        </div>
                        <div className={styles.wrap}>
                            <Controller
                                name="pattern"
                                control={control}
                                render={({ field }) => (
                                    <textarea
                                        className={styles.textarea}
                                        id="pattern"
                                        {...field}>
                                    </textarea>
                                )}
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
                        <div className={styles.list}>
                            <label htmlFor="fileUpload">파일 첨부</label>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.list}>
                            <label htmlFor="openChat">오픈 채팅</label>
                        </div>
                        <div className={styles.wrap}>
                            <div className={styles.form}>
                                <Controller
                                    name="openChat"
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
}
export default Roommate_recruit_update