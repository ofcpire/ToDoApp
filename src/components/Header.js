import styled from "styled-components";

const HeaderContainer = styled.h1`
background-color: #F8D729;
height:50px;
width:100%;
display: flex;
align-items: center;
color:white;
justify-content: center;
position: fixed;
font-weight: 900;
font-size: 24px;
`

export function Header({title}){
  return <HeaderContainer>{title}</HeaderContainer>
}