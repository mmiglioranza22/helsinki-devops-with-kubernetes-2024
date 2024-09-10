import React from "react";
import Todo from "./Todo";

const TodoList = ({ todos }) => {
  return (
    <>
      {todos
        .map((todo, index) => {
          return <Todo key={todo.text + index} text={todo.text} />;
        })
        .reduce((acc, cur) => [...acc, <hr />, cur], [])}
    </>
  );
};

export default TodoList;
