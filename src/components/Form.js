import styled from "styled-components"
import { useState, useEffect } from "react"
import { Header } from "./Header"
import { dateToString } from "../lib/dateFunction"
import axios from "axios"

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
button {
  padding:10px;
  font-size: 24px;
  color:white;
}
`

const FormContainer = styled.div`
position: fixed;
transform: translate3d(${(props => props.position)}vw,0,0);
top:0;
right:0;
width:100vw;
height: 100vh;
background-color: white;
transition: ${props=>props.transition};
z-index: 999;
`

const FormForm = styled.form`
height: ${props => props.innerHeight - 50}px;
min-height: 450px;
width:100%;
display: flex;
flex-direction: column;
justify-content: space-between;
padding:0px 20px 20px 20px;
/* border:2px solid violet; */
margin-top:50px;
button {
  justify-self:end;
  width:100%;
  color:white;
  font-size: 24px;
  font-weight: 700;
  background-color: #F8D729;
  border-radius: 25px;
  height: 50px;
}

`

const FormFormForm = styled.div`

margin-bottom: 20px;
display:flex;
flex-grow: 1;
flex-direction: column;
label {
  font-size: 24px;
  font-weight:700;
  padding: 20px;
}
input, textarea {
  border-radius: 25px;
  height: 50px;
  font-size: 16px;
  width:100%;
  border:none;
  padding:10px 20px;
  background-color: #f3f3f3;
  &:focus {
    border:2px solid grey;
  }
}
textarea {
  flex-grow: 1;
}

`

export function Form({ setIsFormOpen,editObj,resetHandler,obj}) {
  const [formTitle,setFormTitle]=useState(obj?"수정하기":"새로운 ToDo")
  const [title, setTitle] = useState(obj?obj.title:"");
  const [date, setDate] = useState(obj?obj.date:"");
  const [text, setText] = useState(obj?obj.text:"");
  const [id,setId]=useState(obj?obj.id:"");
  const [transition,setTransition]=useState("0.5s");
  const [buttonText, setButtonText] = useState("작성 완료");
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  useEffect(() => {
    const resizeListener=() => {
      setInnerHeight(window.innerHeight);
    };
    window.addEventListener("resize", resizeListener);
  })
  const [position, setPosition] = useState(100);
  useEffect(() => {
    setPosition(0);
    setTimeout(()=>setTransition("0s"),500)
  }, [])

  const formSubmit = (e) => {
    e.preventDefault();
    let data={ title, date, text, check: false, special: false };
    let method;
    if(obj) {
      data={...data,id,check:obj.check,special:obj.special};
      method=`PATCH`;
    }
    else method=`POST`
    axios({
      method,
      data,
      url: `http://localhost:3001/data/${id}`,
    })
    .then(() => {
      setTransition("0.5s")
      resetHandler();
      setPosition(100);
        setTimeout(() => {
          setIsFormOpen([false,null])
        }, 500)
      })
      .catch(err => {
        setButtonText("작성 실패")
        console.log(err)
      })
  }

  const formClose = () => {
    setTransition("0.5s")
    setPosition(100);
    setTimeout(() => {
      setIsFormOpen([false,null])
    }, 500)
  }

  return (
    <FormContainer position={position} transition={transition}>
      <HeaderContainer>
        <button></button>
        {formTitle}
        <button onClick={formClose}><i class="fa-solid fa-xmark"></i></button>
      </HeaderContainer>
      <FormForm innerHeight={innerHeight}>
        <FormFormForm>
          <label htmlFor="title">제목</label>
          <input id="title" value={title} onChange={e => setTitle(e.target.value)} required></input>
          <label htmlFor="date">날짜</label>
          <input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} required></input>
          <label htmlFor="text">내용</label>
          <textarea id="text" value={text} onChange={e => setText(e.target.value)}></textarea>
        </FormFormForm>
        <button onClick={formSubmit}>{buttonText}</button>
      </FormForm>
    </FormContainer>
  )
}