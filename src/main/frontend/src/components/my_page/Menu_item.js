import styled from "styled-components";

const Li = styled.li`
    float: left;
    margin-right: 10px;
    background-color: ${(props) => (props.isClicked ? '#013B70' : '#ffffff')};

    color: ${(props) => (props.isClicked ? '#ffffff' : '#000000')};
    padding: 6px;
    border-radius: 6px 6px 0px 0px;
`

function Menu_item({ id, label, onClick, isClicked }){
    return (
        <Li id={id} onClick={onClick} isClicked={isClicked}>
            {label}
        </Li>
    );

}

export default Menu_item;