import React from "react";
import {useNavigate} from "react-router-dom";
import moment from "moment";
import styled from "styled-components";

const Div = styled.div`
    border: 1px solid #000;
    //box-shadow: 5px 5px 0px 0px #000;
    padding: 10px;
    margin: 10px 0px 0px 0px;
    display: flex;
    align-items: center;
`
const Text = styled.div`

`
const Image = styled.img`
    width: 130px;
    height: 185px;
    background-color: #d9d9d9; 
    margin: 0px 10px 0px 0px;
`
const Title = styled.div`
    display: inline-flex;
    padding: 5px 16px;
    border-radius: 25px;
    border: 1px solid #000;
`
const Content = styled.div`
    margin: 10px 0px 10px 0px;
    font-size: 16px;
    
`
const Li = styled.li`
    padding: 1px;
`
const Promotion_item = ({promotion}) => {
    let startDay = "";
    if(promotion.first.start!=null){ startDay=moment(promotion.first.start).format('YYYY-MM-DD');}
    let finishDay="";
    if(promotion.first.finish!=null){finishDay=moment(promotion.first.finish).format('YYYY-MM-DD');}
    const dateRange = startDay !== "" && finishDay !== "" ? startDay + " - " + finishDay : "미정";
    return (
        <Div>
            <Image src={promotion.second}/>
            <Text>
                <Title><h2>{promotion.first.title}</h2></Title>
                <Content>
                    <Li>위치: {promotion.first.hall+"동 "}{promotion.first.etc}</Li>
                    <Li>과: {promotion.first.major+"과"}</Li>
                    <Li>일시: {dateRange}</Li>
                </Content>
            </Text>


        </Div>

    );
}
export default Promotion_item;