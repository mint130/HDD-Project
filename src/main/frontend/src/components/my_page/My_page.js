import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import Bookmark_list from "./Bookmark_list";
import Written_list from "./Written_list";
import Profile from "./Profile";
import Menu_item from "./Menu_item";
const Div = styled.div`
    width: 900px;
    margin: 0px auto;
    padding-bottom: 120px;
`

const Title = styled.h1`
    padding-top: 20px;
    padding-bottom: 20px;
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    color: #000000;
`
const Ul = styled.ul`
    display: flex;
    font-size: 16px;
    font-weight: 500;
    border-bottom: 2px solid #013b70;
`
const Content = styled.div`
    padding: 20px;
    display: block;
    border-radius: 0px 0px 10px 10px;
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.15);
`
function My_page() {
    const [clicked, setClicked]=useState("profile");
    const handleClick = (id) => {
        setClicked(id);
    }
    const menu_item = [
        { id: "profile", label: "회원정보 보기" },
        { id: "bookmark_list", label: "북마크 보기" },
        { id: "written_list", label: "작성글 보기" }
    ];
    return (
        <Div>
            <Title>마이페이지</Title>
            <Ul>
                {menu_item.map(({id, label})=>(
                    <Menu_item
                        key={id}
                        id={id}
                        label={label}
                        onClick={()=>handleClick(id)}
                        isClicked={clicked===id}
                    />
                ))}
            </Ul>
            <Content>
                {

                    clicked==="profile"? <Profile/>
                        : clicked=="bookmark_list"?<Bookmark_list/>
                            : <Written_list/>
                }
            </Content>


        </Div>
    );
    
}
export default My_page;