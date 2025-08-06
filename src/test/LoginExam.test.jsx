import { describe, beforeEach, afterEach, vi, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginExam from "../exam/LoginExam";

let alertMock;

//시작전 처리
beforeEach(() => {
  alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
});

afterEach(() => {
  alertMock.mockRestore();
});

describe("기본 초기화 상태", () => {
  it("아이디와 비밀번호 input은 빈값이며, 로그인 버튼 존재", () => {
    render(<LoginExam />);

    const idInput = screen.getByPlaceholderText("아이디 입력");
    const pwInput = screen.getByPlaceholderText("비밀번호 입력");
    const button = screen.getByRole("button", { name: "로그인" });

    expect(idInput).toHaveValue("");
    expect(pwInput).toHaveValue("");
    expect(button).toBeInTheDocument();

    expect(alertMock).not.toHaveBeenCalled();
  });
});

describe("input 로그인 테스트", () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("아이디와 패스워드 input이 빈값인 상태에서 로그인 버튼 클릭할 경우", async () => {
    render(<LoginExam />);

    const idInput = screen.getByPlaceholderText("아이디 입력");
    const pwInput = screen.getByPlaceholderText("비밀번호 입력");

    expect(idInput).toHaveValue("");
    expect(pwInput).toHaveValue("");

    const evtSubmit = screen.getByRole("button", { name: "로그인" });
    await user.click(evtSubmit);

    expect(alertMock).toHaveBeenCalledWith("아이디와 비밀번호를 입력하세요");
  });

  it("아이디만 입력한 상태에서 로그인 버튼 클릭할 경우", async () => {
    render(<LoginExam />);

    const idInput = screen.getByPlaceholderText("아이디 입력");
    const pwInput = screen.getByPlaceholderText("비밀번호 입력");

    await user.type(idInput, "aaa");
    expect(pwInput).toHaveValue("");

    const evtSubmit = screen.getByRole("button", { name: "로그인" });
    await user.click(evtSubmit);

    expect(alertMock).toHaveBeenCalledWith("비밀번호를 입력하세요");
  });

  it("패스워드만 입력한 상태에서 로그인 버튼 클릭할 경우", async () => {
    render(<LoginExam />);

    const idInput = screen.getByPlaceholderText("아이디 입력");
    const pwInput = screen.getByPlaceholderText("비밀번호 입력");

    expect(idInput).toHaveValue("");
    await user.type(pwInput, "1234");

    const evtSubmit = screen.getByRole("button", { name: "로그인" });
    await user.click(evtSubmit);

    expect(alertMock).toHaveBeenCalledWith("아이디를 입력하세요");
  });

  it("아이디와 패스워드 입력 후 로그인 버튼 클릭할 경우", async () => {
    render(<LoginExam />);

    const idInput = screen.getByPlaceholderText("아이디 입력");
    const pwInput = screen.getByPlaceholderText("비밀번호 입력");

    await user.type(idInput, "aaa");
    await user.type(pwInput, "1234");

    const evtSubmit = screen.getByRole("button", { name: "로그인" });
    await user.click(evtSubmit);

    expect(alertMock).toHaveBeenCalledWith("로그인 성공: aaa");
  });
});
