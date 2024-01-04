import React from "react";
import { NextPage } from "next";
import TodoList from "../components/TodoList"
// import { TodoType } from "../types/todo";

// interface IProps{
//   todos:TodoType[];
// }
// const TodoList: React.FC<IProps> = () => {
const todos: TodoType[]=[
  {id:1, text:"마트 가서 장보기", color:"red", checked:false},
  {id:2, text:"숙제하기", color:"orange", checked:false},
  {id:3, text:"놀기", color:"yellow", checked:false},
  {id:4, text:"먹기", color:"green", checked:true},
]

const app: NextPage = () =>{
  return <TodoList todos={todos} />;
};

export default app;