import { useEffect, useState } from "react";
import axios from "../util/apiClient";

import List from "./List";
import Form from "./Form";

const TodoView = () => {
  const [todos, setTodos] = useState([]);

  const refreshTodos = async () => {
    const { data } = await axios.get("/api/todos");
    setTodos(data);
  };

  useEffect(() => {
    refreshTodos();
  }, []);

  const createTodo = async (todo) => {
    const { data } = await axios.post("/api/todos", todo);
    setTodos([...todos, data]);
  };

  return (
    <>
      <h1>Todos</h1>
      <Form createTodo={createTodo} />
      <List todos={todos} />
    </>
  );
};

export default TodoView;
