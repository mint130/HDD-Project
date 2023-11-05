import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import Board from "../recruit/board/Board";
import Table from "../recruit/board/Table";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Bookmark_list() {

   // const [isRoommate, setIsRoommate]=useState(false);
    const [isClicked, setIsClicked]=useState("");
    const navigate = useNavigate();
    const [boardList, setBoardList] = useState([]);
    const [limit, setLimit] = useState(5); //페이지 당 게시물 수
    const [page, setPage] = useState(1);    //현재 페이지 번호
    const offset = (page - 1) * limit;  //첫 게시물의 위치
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
    };

    const handleClicked=async (e) => {
        //setIsClicked(!isClicked);
        const id = e.currentTarget.getAttribute("id");
        setIsClicked(id);
        if(id==="project") await getProjectBoardList();
        else{
            await getRoommateBoardList();
        }
        //await getBoardList(id);

    }

    const getBoardList=async(type)=>{

        const params=type;
        try{
            const resp=await axios.get('http://localhost:8080/api/auth/mypage/bookmark', {params});
            console.log(resp.data);
            setBoardList(resp.data);

        } catch (error) {
            alert("로그인이 필요합니다.");
            navigate("/api/auth/signin");
        }
    }
    const getProjectBoardList = async () => {

        try {

            const resp = await axios.get('http://localhost:8080/api/auth/mypage/bookmark/project', { headers: headers });
            console.log(resp.data);
            setBoardList(resp.data);

        } catch (error) {
            alert("로그인이 필요합니다.");
            navigate("/api/auth/signin");
        }
    }
    const getRoommateBoardList = async () => {
        try {
            const resp = await axios.get('http://localhost:8080/api/auth/mypage/bookmark/roommate', { headers: headers });
            console.log(resp.data);
            setBoardList(resp.data);


        } catch (error) {
            alert("로그인이 필요합니다.");
            navigate("/api/auth/signin");
        }
    }


    return (
        <div>
            <Button_area>
                <Label id="project" onClick={handleClicked} isClicked={isClicked}>
                    <Input name="type" type="radio" value="project"/>
                    <span>프로젝트</span>
                </Label>
                <Label id="roommate" onClick={handleClicked}  isClicked={isClicked}>
                    <Input name="type" type="radio" value="roommate"/>
                    <span>룸메이트</span>
                </Label>
            </Button_area>

            <Div>
                {isClicked=="project"?

                    (boardList.length!=0?
                        <Board
                            boardList={boardList}
                            offset={offset}
                            limit={limit}/>:
                        <h2>작성글이 없습니다.</h2>)
                    :
                    (boardList.length!=0?
                        <Table
                            boardList={boardList}
                            offset={offset}
                            limit={limit}/>:
                        <h2>작성글이 없습니다.</h2>)
                }
            </Div>
        </div>
    );

}
export default Bookmark_list;
const Button_area=styled.div`
 
`
const Div = styled.div`
    width: 860px;
`
const Input=styled.input`
    display: none;
`
const Label=styled.button`
    
   
    
      display:inline-block;
    padding: 8px 16px;
   
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
    //border-radius: 8px;
    color: ${(props)=>(props.isClicked==props.id? '#ffffff':'#013B70')};
    background-color: ${(props) => (props.isClicked==props.id ? '#013B70': '#ffffff')};
    border: solid 1px rgba(0,0,0,.08);
   
`