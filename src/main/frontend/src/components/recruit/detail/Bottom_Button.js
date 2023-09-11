import styled from "styled-components";
import {HiOutlineLink,HiStar} from "react-icons/hi";
import {useLocation} from "react-router-dom";

function Bottom_Button({url}){

    const location = useLocation();
    const handleCopyClipBoard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            alert('클립보드에 링크가 복사되었습니다.');
        } catch (error) {
            alert('오류가 발생하였습니다.');
        }
    }

    const handleOpenChattingTap = (url) => {
        window.open(url, '_blank')
    }

    return (
        <Div>
            <Container>
                <Link_Button onClick={() => handleCopyClipBoard(`http://localhost:3000${location.pathname}`)}>
                    <HiOutlineLink className="icon" />
                </Link_Button>
                <Bookmark_Button className="Bookmark_Button">
                    <HiStar className="icon" />
                </Bookmark_Button>
                <OpenChatting_Button onClick={() => handleOpenChattingTap(url)}>
                    오픈채팅
                </OpenChatting_Button>
            </Container>
        </Div>
    );
}

const Bookmark_Button = styled.button`
    &.Bookmark_Button {
    display:inline-block;
    text-align: center;
    width: 48px;
    height: 48px;
    margin-left: 10px;
    padding: 0;
    cursor: pointer;
    box-sizing: border-box;
    border-radius: 8px;
    color: #013B70;
    background-color: rgb(255, 255, 255);
    border: 1px solid #013B70;
    
    &:hover {
    cursor: pointer;
    color: #fff;
    background-color: #013B70;
    border: solid 1px rgba(0,0,0,.08);
    
  }
  
  .icon {
    height: 18px;
    width: 18px;
  }
  }
`
const Link_Button = styled.button`
    display:inline-block;
    font-size: 14px;
    text-align: center;
    width: 48px;
    height: 48px;
    padding: 0;
    margin-left: 10px;
    cursor: pointer;
    box-sizing: border-box;
    border-radius: 8px;
    color: #013B70;
    background-color: rgb(255, 255, 255);
    border: 1px solid #013B70;
    
    &:hover {
    cursor: pointer;
    color: #fff;
    background-color: #013B70;
    border: solid 1px rgba(0,0,0,.08);
  
    
  }
  .icon {
    height: 18px;
    width: 18px;
  }
`;

const Div = styled.div`
    position: fixed;
    width:100%;
    bottom: 0;
    z-index: 40;
`;
const OpenChatting_Button = styled.button`
    display:inline-block;;
    padding: 8px 16px;
    margin-left: 10px;
    width: 96px;
    height: 48px;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
    border-radius: 8px;
    color: #fff;
    border: solid 1px rgba(0,0,0,.08);
    background-color: #013B70;
    
    &:hover {
    cursor: pointer;
    color: #013B70;
    background-color: rgb(255, 255, 255);
    border: 1px solid #013B70;
  }
`
const Container=styled.div`
    display: flex;
    background-color: #fff;
    justify-content: center;
   
    border-top: 1px solid #e8e8e8;
    padding: 16px;
`
export default Bottom_Button;