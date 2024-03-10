import React from "react";
import { NextPage } from "next";
import TodoList from "../components/TodoList";
import { getTodosAPI } from "../lib/api/todo";
import { wrapper } from "../store";
import { todoActions } from "../store/todo";

const app: NextPage = () => {
  return <TodoList />;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async() => {
    try {
      const { data } = await getTodosAPI();
      store.dispatch(todoActions.setTodo(data));
      return {
        props: {} // 여기에 페이지 컴포넌트에 전달할 props를 추가
      };
    } catch (e) {
      console.log(e);
      return {
        props: {} // 오류 발생 시 빈 객체를 반환하거나 오류 처리에 따라 다른 props를 반환
      };
    }
  }
);

export default app;
