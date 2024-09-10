import { render, screen } from "@testing-library/react";
import { expect, describe } from "vitest";
import Todo from "./Todo";

describe("<Todo />", () => {
  // eslint-disable-next-line
  test("renders todo correctly", () => {
    const todoTest = {
      text: "text todo",
      done: false,
      doneInfo: "doneInfo",
      notDoneInfo: "notDoneInfo",
    };

    render(
      <Todo
        key={todoTest.text}
        text={todoTest.text}
        done={todoTest.done}
        doneInfo={todoTest.doneInfo}
        notDoneInfo={todoTest.notDoneInfo}
      />
    );

    const text = screen.getByText("text todo");
    expect(text).toBeDefined();
  });
});
