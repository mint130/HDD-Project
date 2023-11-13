import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const {coll,dept} = {coll:[ {coll:'학생공지'},
        {coll:'공과대학'},{coll:'건축도시대학'},{coll:'경영대학'},{coll:'문과대학'},{coll:'법과대학'},{coll:'사범대학'},
        {coll:'미술대학'},{coll:'경제학부'},{coll:'공연예술학부'},{coll:'디자인경영융합'},{coll:'자율전공'}],

    dept:[{coll:'학생공지', dept:''},{coll:'공과대학', dept:'선택'},
        {coll:'공과대학', dept:'건설환경공학과'},
        {coll:'공과대학', dept:'전자전기공학부'},{coll:'공과대학', dept:'컴퓨터공학과'},{coll:'공과대학', dept:'산업데이터공학과'},
        {coll:'공과대학', dept:'신소재공학전공'},{coll:'공과대학', dept:'화학공학전공'}, {coll:'공과대학', dept:'기계시스템디자인공학과'},{coll:'건축도시대학', dept:'선택'},
        {coll:'건축도시대학', dept:'건축학부'},{coll:'경영대학', dept:'선택'},{coll:'경영대학', dept:'경영학전공'},{coll:'문과대학', dept:'선택'},
        {coll:'문과대학', dept:'영어영문학과'},{coll:'문과대학', dept:'독어독문학과'},{coll:'문과대학', dept:'불어불문학과'},
        {coll:'문과대학', dept:'국어국문학과'},{coll:'법과대학', dept:'선택'},{coll:'법과대학', dept:'법학부'},{coll:'사범대학', dept:'선택'},
        {coll:'사범대학', dept:'수학교육과'}, {coll:'사범대학', dept:'국어교육과'},{coll:'사범대학', dept:'영어교육과'},
        {coll:'사범대학', dept:'역사교육과'}, {coll:'사범대학', dept:'교육학과'},{coll:'미술대학', dept:'선택'},
        {coll:'미술대학', dept:'동양화과'}, {coll:'미술대학', dept:'회화과'}, {coll:'미술대학', dept:'판화과'},
        {coll:'미술대학', dept:'조소과'},{coll:'미술대학', dept:'목조형가구학과'},{coll:'미술대학', dept:'예술학과'},
        {coll:'미술대학', dept:'금속조형디자인과'}, {coll:'미술대학', dept:'도예유리과'}, {coll:'미술대학', dept:'섬유미술패션디자인과'}, {coll:'미술대학', dept:'시각디자인전공'},  {coll:'미술대학', dept:'산업디자인전공'},
        {coll:'경제학부', dept:'선택'},{coll:'경제학부', dept:'경제학전공'},{coll:'공연예술학부', dept:'선택'},{coll:'공연예술학부', dept:'뮤지컬전공'}, {coll:'공연예술학부', dept:'실용음악전공'},
        {coll:'디자인경영융합', dept:'선택'},{coll:'디자인경영융합', dept:'디자인경영융합'},
        {coll:'자율전공', dept:'선택'},{coll:'자율전공', dept:'캠퍼스자율전공'}
    ]};




function Notice() {
    const [val1, setVal1] = useState("");
    const [val2, setVal2]=useState("");
    const [loading, setLoading] = useState(true);
    const [noticeList, setNoticeList]=useState([]);
    const getNotice=async (val2)=>{
        console.log(val2);

        try{
            const resp = await axios.get(`http://localhost:8080/notice`,
                { params: {

                       major: val2

                    }
            } );
            console.log(resp.data);
            setNoticeList(resp.data);
        } catch (error) {
          console.log(error);
        }
    }
    useEffect(() => {

        //console.log(val2);
        if(!val2){getNotice(null)}
        getNotice(val2);
    }, [val2]);


    const handleNotice=(e)=>{

        setVal2(e.target.value);
        //console.log(val2);
    }
    return (
        <div className="notice">
            <div className="form-group">
                <h2>공지사항</h2>
                <select onChange={(e)=>setVal1(e.target.value)} >
                    {coll.map((el)=>(
                        <option key={el.coll} value={el.coll}>
                            {el.coll}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group2">
                <select onChange={handleNotice}>
                    {dept.filter((el)=>el.coll===val1)
                        .map((el)=>(
                            <option key={el.dept} value={el.dept} >{el.dept}
                            </option>
                        ))}
                </select>
            </div>
            <hr/>
            <div className="article_n">
                {
                    noticeList.slice(0,5).map((notice, index)=>{
                       return(
                           <div key={index}>
                               <li>
                                   <a href={notice.link}>
                                       {notice.title}
                                   </a>
                               </li>
                           </div>
                       );
                    })
                }

            </div>
        </div>
    );

}

export default Notice;