import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HobbiesExam from "../exam/HobbiesExam";

describe("기본 초기화 상태", () => {
  it("체크박스는 모두 해제, 결과는 빈값", () => {
    render(<HobbiesExam />);

    const movieCheck = screen.getByRole("checkbox", { name: "영화" });
    const musicCheck = screen.getByRole("checkbox", { name: "음악감상" });
    const walkCheck = screen.getByRole("checkbox", { name: "산책" });
    const gameCheck = screen.getByRole("checkbox", { name: "게임하기" });

    expect(movieCheck).not.toBeChecked();
    expect(musicCheck).not.toBeChecked();
    expect(walkCheck).not.toBeChecked();
    expect(gameCheck).not.toBeChecked();

    const confirmBtn = screen.getByRole("button", { name: "확인" });
    expect(confirmBtn).toBeInTheDocument();

    expect(screen.getByTestId("result")).toHaveTextContent("");
  });
});

describe("체크박스 테스트", () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("체크박스 선택 안하고 확인버튼 클릭한 경우", async () => {
    render(<HobbiesExam />);

    const movieCheck = screen.getByRole("checkbox", { name: "영화" });
    const musicCheck = screen.getByRole("checkbox", { name: "음악감상" });
    const walkCheck = screen.getByRole("checkbox", { name: "산책" });
    const gameCheck = screen.getByRole("checkbox", { name: "게임하기" });

    expect(movieCheck).not.toBeChecked();
    expect(musicCheck).not.toBeChecked();
    expect(walkCheck).not.toBeChecked();
    expect(gameCheck).not.toBeChecked();

    const confirmBtn = screen.getByRole("button", { name: "확인" });
    await user.click(confirmBtn);

    expect(screen.getByTestId("result")).toHaveTextContent("선택 없음");
  });

  it("영화, 음악감상을 선택한 경우", async () => {
    render(<HobbiesExam />);

    const movieCheck = screen.getByRole("checkbox", { name: "영화" });
    const musicCheck = screen.getByRole("checkbox", { name: "음악감상" });
    const walkCheck = screen.getByRole("checkbox", { name: "산책" });
    const gameCheck = screen.getByRole("checkbox", { name: "게임하기" });

    await user.click(movieCheck);
    await user.click(musicCheck);

    expect(movieCheck).toBeChecked();
    expect(musicCheck).toBeChecked();
    expect(walkCheck).not.toBeChecked();
    expect(gameCheck).not.toBeChecked();

    const confirmBtn = screen.getByRole("button", { name: "확인" });
    await user.click(confirmBtn);

    expect(screen.getByTestId("result")).toHaveTextContent("영화, 음악감상");
  });
});
