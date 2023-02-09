import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { Todo } from "./Todo";
import { dateParser } from "../lib/dateFunction";

const TodoListContainer = styled.div`
overflow: auto;
margin-top: 50px;
`

const TodoDate = styled.h2`
padding: none;
margin: none;
font-size: 24px;
font-weight: 500;
`

const TodoListByDate = styled.div`
padding:12px;
`

export function TodoList({reset,resetHandler,setIsFormOpen}) {

  const [todoData, setTodoData] = useState([]);

 

  useEffect(() => {
    axios({
      url: "http://localhost:3001/data",
      method: "GET"
    })
      .then((res) => {
        setTodoData([]);
        const specials={date:"Special",todo:[]};
        const todoArray = [];
        for (let todo of res.data) {
          const dateObj = todoArray.find(obj => obj.date === todo.date);
          if(todo[`special`]){
            specials.todo.push(todo);
          }
          else if (dateObj) dateObj.todo.push(todo);
          else {
            const newDateObj = { date: todo.date, todo: [todo] };
            todoArray.push(newDateObj);
          }
          
        }
        todoArray.sort((a, b) => {
          const aDate = new Date(a.date);
          const bDate = new Date(b.date);
          return aDate - bDate;
        });
        if(specials.todo.length>0)todoArray.unshift(specials);
        setTodoData(todoArray);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [reset])

  return (
    <TodoListContainer>
      {todoData.map((obj) => {
        return (
          <TodoListByDate key={obj.date}>
            <TodoDate>
              {dateParser(obj.date)}
            </TodoDate>
            <div>
              {obj.todo.map(obj => <Todo key={obj.id} obj={obj} reset={reset} resetHandler={resetHandler} setIsFormOpen={setIsFormOpen} />)}
            </div>
          </TodoListByDate>)
      })}
    </TodoListContainer>
  )
}

