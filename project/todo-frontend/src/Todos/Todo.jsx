import React from "react";

const Todo = ({ text }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "70%",
        margin: "auto",
      }}
    >
      <span>{text}</span>
    </div>
  );
};

export default Todo;
