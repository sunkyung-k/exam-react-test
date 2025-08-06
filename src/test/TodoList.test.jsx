import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoList from "../exam/TodoList";

let alertMock;

//시작전 처리
beforeEach(() => {
  alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
});

afterEach(() => {
  alertMock.mockRestore();
});

describe("기본 초기화 상태", () => {
  it("할 일 input 빈값, 추가 버튼과 아이디/할일 table 존재", () => {
    render(<TodoList />);

    const todoInput = screen.getByRole("textbox", { id: "todoInput" });
    const addButton = screen.getByRole("button", { name: "추가" });
    const table = screen.getByRole("table");

    expect(todoInput).toHaveValue("");
    expect(addButton).toBeInTheDocument();
    expect(table).toBeInTheDocument();
  });
});

describe("할 일 추가 테스트", () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("할 일 input 빈값인 상태에서 추가 버튼 클릭한 경우", async () => {
    render(<TodoList />);

    const todoInput = screen.getByRole("textbox", { id: "todoInput" });
    const addButton = screen.getByRole("button", { name: "추가" });

    expect(todoInput).toHaveValue("");
    await user.click(addButton);

    expect(alertMock).toHaveBeenCalledWith("할일을 입력");
  });

  it("할 일을 입력 후 추가 버튼을 1번만 클릭한 경우", async () => {
    render(<TodoList />);

    const todoInput = screen.getByRole("textbox", { id: "todoInput" });
    const addButton = screen.getByRole("button", { name: "추가" });

    await user.type(todoInput, "aaaaaaa");
    await user.click(addButton);

    expect(alertMock).not.toHaveBeenCalled();

    expect(screen.getByText("aaaaaaa")).toBeInTheDocument();

    const row = screen.getByText("aaaaaaa").closest("tr");
    expect(row).toHaveTextContent("1");
    expect(row).toHaveTextContent("aaaaaaa");
  });

  it("할 일을 입력 후 추가 버튼을 연속으로 3번 클릭한 경우", async () => {
    render(<TodoList />);

    const todoInput = screen.getByRole("textbox", { id: "todoInput" });
    const addButton = screen.getByRole("button", { name: "추가" });

    await user.type(todoInput, "aaaaaaa");
    await user.click(addButton);
    await user.click(addButton);
    await user.click(addButton);

    expect(alertMock).not.toHaveBeenCalled();

    const todoItems = screen.getAllByText("aaaaaaa");
    expect(todoItems).toHaveLength(3);

    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("1");
    expect(rows[1]).toHaveTextContent("aaaaaaa");
    expect(rows[2]).toHaveTextContent("2");
    expect(rows[2]).toHaveTextContent("aaaaaaa");
    expect(rows[3]).toHaveTextContent("3");
    expect(rows[3]).toHaveTextContent("aaaaaaa");
  });
});
