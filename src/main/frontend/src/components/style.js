import styled from "styled-components";
export const Container = styled.div`
    width: 720px;
    margin: 0px auto;

`
export const Title = styled.h1`
 padding: 20px;
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    color: #000000;
`
export const Content=styled.div`
     width: 520px;
    margin: 0px auto;
`
export const Row=styled.div`
     display: inline-flex;
    width: 100%;
    padding: 12px 20px;
    font-size: 16px;
    flex-direction: row;
    align-items: center;

`
export const List=styled.div`
  font-weight: 600;
    display: inline;
    width: 140px;
`
export const Form = styled.div`
      position: relative;
    height: 40px;
    border: solid 1px #dadada;
    border-radius: 3px;
    padding: 10px 10px 10px 10px;
    background: #fff;
    box-sizing: border-box;
`
export const Button = styled.button`
        display: block;
    width:180px;
    height: 48px;
    padding: 0 10px;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
    border-radius: 3px;
    color: #fff;
    border: solid 1px rgba(0,0,0,.08);
    background-color: #013B70;
    `
export const ButtonArea=styled.div`
     display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    border-top: 1px solid rgb(247, 247, 247);
    padding: 40px 0px;
    `

export const Wrap=styled.div`
     display: block;
    width: 280px;
    `

export const Input=styled.input`
    accent-color: #013B70;
    `