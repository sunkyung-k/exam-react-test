import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CounterExam from "../exam/CounterExam";

describe("기본 초기화 상태", () => {
  it("초기 카운트 0", () => {
    render(<CounterExam />);

    const buttonUp = screen.getByRole("button", { name: "증가하기" });
    const buttonDown = screen.getByRole("button", { name: "감소하기" });

    expect(buttonUp).toBeInTheDocument();
    expect(buttonDown).toBeInTheDocument();

    expect(screen.getByText("결과 : 0")).toBeInTheDocument();
  });
});

describe("카운트 테스트", () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("증가하기 버튼 1번 클릭하면 값이 1 증가", async () => {
    render(<CounterExam />);

    const buttonUp = screen.getByRole("button", { name: "증가하기" });
    await user.click(buttonUp);

    expect(screen.getByText("결과 : 1")).toBeInTheDocument();
  });

  it("증가하기 버튼 2번 클릭하면 값이 2 증가", async () => {
    render(<CounterExam />);

    const buttonUp = screen.getByRole("button", { name: "증가하기" });
    await user.click(buttonUp);
    await user.click(buttonUp);

    expect(screen.getByText("결과 : 2")).toBeInTheDocument();
  });

  it("감소하기 버튼 1번 클릭하면 값이 1 감소", async () => {
    render(<CounterExam />);

    const buttonDown = screen.getByRole("button", { name: "감소하기" });
    await user.click(buttonDown);

    expect(screen.getByText("결과 : -1")).toBeInTheDocument();
  });
});
