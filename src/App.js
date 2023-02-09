import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import styled from 'styled-components';
import { TodoList } from './components/TodoList';
import GlobalStyles from './GlobalStyles';
import { Form } from './components/Form';


const Main = styled.div`
background-color: white;
/* border:2px solid red; */
width:100vw;
height:100vh;
overflow: hidden;
display: flex;
`

function App() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <Main>
      {isLogin ?
        <TodoMain /> :
        <LoginForm />
      }
    </Main>
  );
}

function LoginForm() {
  return <div>login</div>
}

const TodoMainContainer = styled.div`
width:100%;
height:100%;
font-family: 'Noto Sans KR', sans-serif;
overflow: auto;
`
const HeaderContainer = styled.h1`
background-color: #F8D729;
height:50px;
width:100%;
display: flex;
align-items: center;
color:white;
justify-content: center;
position: fixed;
font-weight: 700;
font-size: 24px;
display: flex;
justify-content: space-between;
z-index: 99;
button {
  padding:10px;
  font-size: 24px;
  color:white;
}
`

function TodoMain() {
  const [reset, setReset] = useState(false);
  const resetHandler = () => {
    console.log(reset);
    setReset(!reset)
  }
  const [isFormOpen,setIsFormOpen]=useState([false,null]);
  const [isSidebarOpen,setIsSidebarOpen]=useState([false,null]);
  const formOpenHandler=()=>{
    setIsFormOpen([true,null]);
  }
  return (
    
      <TodoMainContainer>
        <GlobalStyles/>
        <HeaderContainer>
          <button><i class="fa-solid fa-bars"></i></button>
          <h1>WhatTodo</h1>
          <button onClick={formOpenHandler}><i class="fa-solid fa-plus"></i></button>
        </HeaderContainer>
        <TodoList resetHandler={resetHandler} reset={reset} setIsFormOpen={setIsFormOpen}/>
        {isFormOpen[0]&&<Form setIsFormOpen={setIsFormOpen} resetHandler={resetHandler} obj={isFormOpen[1]}/>}
      </TodoMainContainer>

  )
}



export default App;
