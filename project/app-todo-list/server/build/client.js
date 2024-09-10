let allTodos = [];

const TODO_BACKEND =
  "http://localhost:6000" || "http://todo-app-backend-svc:1234";

const getTodos = async () => {
  const todos = await fetch(TODO_BACKEND);
  console.log(todos);
  allTodos = [...allTodos, ...todos];
};

getTodos();
