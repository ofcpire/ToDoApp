import { useState, useEffect } from "react";
import styled from "styled-components";
import { dateParser, dateStrictParser } from "../lib/dateFunction";
import axios from "axios";

const TodoDiv = styled.div`
width:100%;
margin-top:12px;
display:flex;
min-height:60px;
border-bottom: 1px solid lightgrey;
/* background-color: lightgrey;
padding:5px;
border-radius: 10px; */
`

const TodoButton = styled.button`
align-self: flex-start;
height: 60px;
font-size:24px;
transition:0.3s;
color:grey;
transform:rotate(${(props => props.buttonDegree || 0)}deg);
`

const TodoInfo = styled.div`
display: flex;
flex-grow: 1;
flex-direction: column;
width:100%;
padding:10px;
align-self: center;
color:${props => props.isCheck ? "#c7c7c7" : "#404040"};
.todo-title {
font-size:20px;
font-weight: 400;
text-decoration: ${props => props.isCheck ? "line-through" : "none"};
}
.todo-date {
  font-size: 12px;
  color:grey;
  padding:5px 0px;
}
span{
  padding:2px;
  text-decoration: ${props => props.isCheck ? "line-through" : "none"};
}
.todo-text-close {
  width:${props=>props.innerWidth/1.5}px;
  /* border:1px solid green; */
  text-overflow:ellipsis;
  overflow:hidden;
  white-space: nowrap;
}
`

const TodoMenu = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
padding-top:12px;
`

const TodoMenuBtn = styled.button`
font-size: 30px;
  margin:0px 20px;
  color:${props => props.color};
  padding:5px;
  transition: 0.1s;
  &:hover{
    opacity: 0.5;
  }
`

export function Todo({ obj, resetHandler, reset, setIsFormOpen }) {

  const [buttonDegree, setButtonDegree] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isCheck, setIsCheck] = useState(obj.check);
  const [isAlarm, setIsAlarm] = useState(false);
  const [isSpecial, setIsSpecial] = useState(obj.special);
  const [innerWidth,setInnerWidth]=useState(window.innerWidth);
  useEffect(() => {
  }, [reset])
  useEffect(() => {
    const resizeListener=() => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);
  })

  const checkHandler = () => {
    axios({
      method: `PATCH`,
      url: `http://localhost:3001/data/${obj.id}`,
      data: { check: !isCheck }
    })
      .then(() => {
        setIsCheck(!isCheck)
      })
      .catch(err => console.log(err));
  }

  const specialHandler = () => {
    axios({
      method: `PATCH`,
      url: `http://localhost:3001/data/${obj.id}`,
      data: { special: !isSpecial }
    })
      .then(() => {
        setIsSpecial(!isSpecial)
        resetHandler();
      })
      .catch((err) => console.log(err))
  }

  const openHandler = () => {
    setIsOpen(!isOpen)
    setButtonDegree(prevState => prevState + 180);
  }

  const deleteHandler = () => {
    axios({
      method: `DELETE`,
      url: `http://localhost:3001/data/${obj.id}`,
    })
      .then(() => resetHandler())
      .catch((err) => console.log(err))
  }

  const editHandler = () => {
    setIsFormOpen([true, obj])
  }

  const alarmHandler = () => {
    setIsAlarm(!isAlarm);
  }

  return (
    <TodoDiv>
      <TodoButton onClick={checkHandler}>
        {isCheck ? <i className="fa-regular fa-circle-check"></i> : <i className="fa-regular fa-circle"></i>}
      </TodoButton>
      <TodoInfo isCheck={isCheck} innerWidth={innerWidth}>
        <h3 className="todo-title">{obj.title}</h3>
        {isOpen && <span className="todo-date">{dateStrictParser(obj.date)}</span>}
        {obj.text.length > 0?
        isOpen?
        <span className="todo-text-open">{obj.text}</span>
        :<span className="todo-text-close">{obj.text}</span>
        :null}
        {isOpen &&
          <TodoMenu>
            <TodoMenuBtn color="#ffe600" onClick={specialHandler}>{isSpecial ? <i className="fa-solid fa-star"></i> : <i className="fa-regular fa-star"></i>}</TodoMenuBtn>
            <TodoMenuBtn color="#ff8000" onClick={alarmHandler}>{isAlarm ? <i class="fa-solid fa-bell"></i> : <i className="fa-regular fa-bell"></i>}</TodoMenuBtn>
            <TodoMenuBtn color="#49c904" onClick={editHandler}><i className="fa-regular fa-pen-to-square"></i></TodoMenuBtn>
            <TodoMenuBtn color="#ff0800" onClick={deleteHandler}><i className="fa-regular fa-trash-can"></i></TodoMenuBtn>
          </TodoMenu>}
      </TodoInfo>
      <TodoButton onClick={openHandler} buttonDegree={buttonDegree}>
        <i className="fa-solid fa-angle-down"></i>
      </TodoButton>
    </TodoDiv>
  )
}