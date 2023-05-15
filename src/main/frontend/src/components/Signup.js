import React, {useState, useEffect, useRef} from "react";
import axios, {postForm} from "axios";
import {useForm} from 'react-hook-form';

const parents = [
    { value: '', label: '' },
    { value: 'engineering', label: '공과대학' },
    { value: 'art', label: '미술대학' },
    { value: 'edu', label: '사범대학' },
];
const childMap = {
    'engineering': [
        { value: 'ce', label: '컴퓨터공학과' },
        { value: 'ie', label: '산업데이터공학과' },
        { value: 'ee', label: '전자전기공학부  ' },
    ],
    'art': [
        { value: 'sidi', label: '시각디자인전공' },
        { value: 'id', label: '산업디자인전공' },
        { value: 'orip', label: '동양화과' },
    ],
    'edu': [
        { value: 'mathedu', label: '수학교육과' },
        { value: 'koredu', label: '국어교육과' },
        { value: 'engedu', label: '영어교육과' },
    ],
};



function SignUp() {
/*
    const {
        register, 유효성 확인
        handleSubmit, 폼을 제출
        watch, 실시간으로 입력폼에 적힌 값 확인
        formState: {errors, isSubmitting, isDirty, isValid},
    }=useForm({mode: "onChange"}); //객체 넣어준 뒤 ode: onChange 입력하면 실시간 오류메세지 출력
 */
/*
   public class SignupRequest {
    private String sid;
    private String password;
    private String passwordCheck;
    private String email;
    private boolean emailVerified;
    private String nickname;
    private String major;
    private String doubleMajor;
    private Set<String> role = null;

   */

    //다중셀렉트문 구현
    const [childOptions, setChildOptions] = useState([]);
    const [emailValid, setEmailValid]=useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [email, setEmail] = useState('');


    const handleEmailValid=(e)=>{
        const enteredEmail=e.target.value;
        setEmail(enteredEmail);

        //이메일 형식 유효성 검사
        const emailPattern=/^\S+(@g\.hongik\.ac\.kr)$/;
        setEmailValid(emailPattern.test(enteredEmail));

    }

    function handleParentChange(e) {
        const { value } = e.target;
        const options = value ? childMap[value] : [];
        setChildOptions(options);
    }

    //signupRequest 객체에 값 넣어서 반환
    const{register, control, handleSubmit, watch, formState: {errors}}=useForm({mode:'onChange'});

    //비밀번호 재확인
    const password=useRef({});
    password.current=watch("password","");

    //이메일 인증 by chatgpt
    const handleSendVerificationCode = () => {
        if(!emailValid){
            return;
        }
        /*axios.get(`http://localhost:8080/api/auth/signup/create`, {
            params: {
                sendEmail: true,
                email: email
            }
        })
            .then(() => {
                alert('인증번호가 이메일로 전송되었습니다.');
    
                setEmailVerified(true);
                
            })
            .catch((error) => console.error(error));

         */
       setEmailVerified(true);

    };

    const handleVerificationCodeSubmit = (data) => {
        if (data.signification === verificationCode) {
            //필요한건가

            alert('이메일 인증이 완료되었습니다.');
        } else {
            alert('인증번호가 올바르지 않습니다.');
        }

    }

    //console.log(watch());
    const onSubmit=data=>{
        console.log(data);
        //post 요청 보낼 url
        axios.post('http://localhost:8080/api/auth/signup/create', {
            sid: data.sid,
            password: data.password,
            passwordCheck: data.passwordCheck,
            email: data.email,
            emailVerified: true,
            nickname: data.nickname,
            major: data.major,
            doubleMajor: data.doubleMajor
        }, {
            headers: { 'Content-type': 'application/json' }
        })
            .then(() => {
                alert('회원가입이 완료되었습니다.');
            })
            .catch(error => console.error(error));
    };
    //여기서, 사용자에게 입력을 받을 Input 태그에 register 함수를 등록하고,
    // handleSubmit 함수를 이용하여 form 요소에서 발생하는 submit 이벤트를 처리해준다.

    const onError= errors=>console.log(errors);
    return(
        <form onSubmit={handleSubmit(onSubmit,onError)}>
            <div>
                <h2>회원가입</h2>
                <div>
                    <label htmlFor='sid'> 아이디(학번) </label>
                    <input id='sid' type='text' placeholder='학번을 입력하세요. 예)C123456'
                        {...register("sid",{
                            required:"아이디(학번)은 필수 입력입니다",
                            pattern:{
                                value:/[abcABC]{1}\d{6}/,
                                message:"학번 형식에 맞지 않습니다",
                            },
                        })}
                    />
                    <span>{errors?.sid?.message}</span>
                </div>
                <div>
                    <label htmlFor='password'>비밀번호</label>
                    <input id='password' type='password' placeholder='비밀번호를 입력하세요'
                        {...register("password", {
                            required:"비밀번호는 필수 입력입니다",
                            pattern:{
                                value:  /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{10,}$/,
                                message: "영어, 문자, 특수 문자 중 두가지 이상 10자리 이내"
                            },
                        })}
                    />
                    <span>{errors?.password?.message}</span>
                </div>
                <div>
                    <label htmlFor='passwordCheck'>비밀번호 재확인</label>
                    <input id='passwordCheck' type='password' placeholder='비밀번호를 다시 입력하세요'
                    {...register("passwordCheck", {
                        required:"비밀번호를 다시 입력해주세요",
                       validate:(value)=>
                           value===password.current||"비밀번호가 일치하지 않습니다.",
                     })}
                    />
                    <span>{errors?.passwordCheck?.message}</span>
                </div>
                <div>
                    <label htmlFor="email">이메일</label>
                    <input id="email" type="text" placeholder="예) abc123@g.hongik.ac.kr"
                           {...register("email", {required: "이메일은 필수 입력입니다",
                               pattern: {
                                   value: /^\S+(@g.hongik.ac.kr)/,
                                   message: '이메일 형식에 맞게 입력해주세요.',
                               },
                           })}
                           value={email} onChange={handleEmailValid}
                    />
                    <span>{errors?.email?.message}</span>
                </div>
                <div>
                    {!emailVerified ? (
                        <button type="button" onClick={handleSendVerificationCode}
                                disabled={!emailValid}>
                            인증번호 받기
                        </button>
                    ): (
                        <>
                            <label htmlFor="signification">인증번호 입력</label>
                            <input
                                id="signification"
                                type="text"
                                placeholder="인증번호를 입력하세요"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                required
                            />
                            <button type="submit" disabled={!verificationCode}>
                                인증번호 입력
                            </button>
                        </>
                    )}
                </div>
                <div>
                    <label htmlFor='nickname'>닉네임</label>
                    <input id='nickname' type='text' placeholder="닉네임을 입력하세요"
                        {...register("nickname", {required: "닉네임은 필수 입력입니다",})}/>
                    <span>{errors?.nickname?.message}</span>
                </div>

                <div>
                    <button>중복 확인</button>
                </div>
                <div>
                    <label htmlFor='major'>전공</label>
                    <select id="college" onChange={handleParentChange}>
                        {parents.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <select id="major" {...register('major',{required: "전공은 필수 입력입니다"})}>
                        {childOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <span>{errors?.major?.message}</span>
                </div>
                <button type='submit' disabled={!verificationCode}>가입하기</button>
            </div>
        </form>
    )
}



export default SignUp