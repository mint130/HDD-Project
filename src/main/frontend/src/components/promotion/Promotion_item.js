import React from "react";
import {useNavigate} from "react-router-dom";
import moment from "moment";
import styled from "styled-components";

const Div = styled.div`
    border: 1px solid #000;
    //box-shadow: 5px 5px 0px 0px #000;
    padding: 10px;
    margin: 10px 0px 0px 0px;
`

const Title = styled.div`
    display: inline-flex;
    padding: 5px 16px;
    border-radius: 25px;
    border: 1px solid #000;
`
const Content = styled.div`
    margin: 10px;
    font-size: 16px;
    
`
const Li = styled.li`
    padding: 2px;
`
const Promotion_item = ({promotion}) => {
    let startDay = "";
    if(promotion.start!=null){ startDay=moment(promotion.start).format('YYYY-MM-DD');}
    let finishDay="";
    if(promotion.finish!=null){finishDay=moment(promotion.finish).format('YYYY-MM-DD');}
    const dateRange = startDay !== "" && finishDay !== "" ? startDay + " - " + finishDay : "미정";
    return (
        <Div>
            <Title><h2>{promotion.title}</h2></Title>
            <Content>
                <li>위치: {promotion.hall+"동 "}{promotion.etc}</li>
                <li>과: {promotion.major+"과"}</li>
                <li>기간: {dateRange}</li>
            </Content>

        </Div>

    );
}
export default Promotion_item;