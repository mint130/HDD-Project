import {useState} from "react";
import styled from "styled-components";

function Search_bar({onSearch}) {

    const [search, setSearch]=useState("");
    const handleSearch=()=>{
        console.log(search);
        onSearch(search);
    }
    const handleChange=(e)=>{
        setSearch(e.target.value);
    }

    return (
        <Div>
            <Form>
                <Input type="text" value={search} onChange={handleChange}/>
            </Form>
            <Button onClick={handleSearch}>검색</Button>
        </Div>
    );
    
}
const Div = styled.div`
    display: flex;

`
const Form = styled.div`
  
    border: solid 1px #dadada;
    border-radius: 3px;
    padding: 5px;
    background: #fff;
    box-sizing: border-box;
`
const Input=styled.input`
    accent-color: #013B70;
    `
const Button = styled.button`
    color: #fff;
    border: solid 1px rgba(0,0,0,.08);
    background-color: #013B70;
    width:60px;
    height: 30px;
    padding: 0 10px;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
    border-radius: 3px;
    
`
export default Search_bar;