import { APIserver, mockRedirect, mockRouter } from "@/vitest-setup";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { EditProfileHandlers, errorEditProfileHandlers, setupEditProfileMock } from "./profileEditMock";
import { render, screen, waitFor } from "@testing-library/react";
import Edit from "@/app/profile/edit/page";
import { genderHandlers } from "@/test/mocks/genderMock";
import { noteHandlers } from "@/test/mocks/noteMock";
import userEvent from "@testing-library/user-event";
import * as useKeyboardModule from '@/features/keyboard/hooks/useKeyboard';

describe('プロフィール編集ページ', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    APIserver.resetHandlers();
    APIserver.use(...genderHandlers, ...noteHandlers);
  });

  test("ログインしていない場合、ログインページにリダイレクトされる", async () => {
    APIserver.use(setupEditProfileMock('notLoggedIn'));
    render(await Edit());
    expect(mockRedirect).toHaveBeenCalledWith("/login");
  });

  test("プロフィール編集フォームが正しく表示される", async () => {
    APIserver.use(...EditProfileHandlers);
    render(await Edit());

    await waitFor(() => {
      expect(screen.getByText("プロフィール編集")).toBeInTheDocument();
      expect(screen.getByLabelText("ユーザー名")).toBeInTheDocument();
      expect(screen.getByLabelText("性別")).toBeInTheDocument();
      expect(screen.getByLabelText("音域高")).toBeInTheDocument();
      expect(screen.getByLabelText("音域低")).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '保存' })).toBeInTheDocument();
    });
  });

  test("フォームに初期値が正しく設定される", async () => {
    APIserver.use(...EditProfileHandlers);
    render(await Edit());

    await waitFor(() => {
      expect(screen.getByLabelText("ユーザー名")).toHaveValue("test");
      expect(screen.getByLabelText("性別")).toHaveValue("男性");
      expect(screen.getByLabelText("音域高")).toHaveValue("ラ#5");
      expect(screen.getByLabelText("音域低")).toHaveValue("ド#3");
    });
  });

  test("入力した名前が短すぎる場合にエラーメッセージが表示される", async () => {
    APIserver.use(...EditProfileHandlers);
    render(await Edit());

    const nameInput = screen.getByLabelText("ユーザー名");
    const submitButton = screen.getByRole('button', { name: '保存' });

    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, "a");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("※ユーザー名は2文字以上で入力してください。")).toBeInTheDocument();
    });
  });

  test("音域を片方しか入力していない場合にエラーメッセージが表示される", async () => {
    APIserver.use(...EditProfileHandlers);
    render(await Edit());

    await waitFor(() => {
      expect(screen.getByLabelText("音域高")).toBeInTheDocument();
      expect(screen.getByLabelText("音域低")).toBeInTheDocument();
    });

    const highNoteSelect = screen.getByLabelText("音域高");
    const lowNoteSelect = screen.getByLabelText("音域低");
    const submitButton = screen.getByRole('button', { name: '保存' });

    await userEvent.selectOptions(highNoteSelect, "未選択");
    await userEvent.selectOptions(lowNoteSelect, "レ3");
    await userEvent.click(submitButton);

    await waitFor(() => {
      const errorMessages = screen.getAllByText("音域高と音域低は両方とも入力するか、どちらも空にしてください。");
      expect(errorMessages.length).toBeGreaterThan(0);
    });
  });

  test("プロフィール編集フォームが正しく送信される", async () => {
    APIserver.use(...EditProfileHandlers);
    render(await Edit());

    await waitFor(() => {
      expect(screen.getByLabelText("ユーザー名")).toBeInTheDocument();
    });

    const nameInput = screen.getByLabelText("ユーザー名");
    const genderSelect = screen.getByLabelText("性別");
    const highNoteSelect = screen.getByLabelText("音域高");
    const lowNoteSelect = screen.getByLabelText("音域低");
    const submitButton = screen.getByRole('button', { name: '保存' });

    await userEvent.type(nameInput, "newName");
    await userEvent.selectOptions(genderSelect, "女性");
    await userEvent.selectOptions(highNoteSelect, "シ5");
    await userEvent.selectOptions(lowNoteSelect, "レ3");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith("/profile");
      expect(mockRouter.refresh).toHaveBeenCalled();
    });
  });

  test("APIエラー時にエラーメッセージが表示される", async () => {
    APIserver.use(...errorEditProfileHandlers);
    render(await Edit());

    await waitFor(() => {
      expect(screen.getByLabelText("ユーザー名")).toBeInTheDocument();
    });

    const nameInput = screen.getByLabelText("ユーザー名");
    const submitButton = screen.getByRole('button', { name: '保存' });

    await userEvent.type(nameInput, "newName");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("正常に送信できませんでした")).toBeInTheDocument();
    });
  });

  test("キーボードを表示ボタンが存在する", async () => {
    APIserver.use(setupEditProfileMock());
    render(await Edit());
    await waitFor(() => {
      expect(screen.getByText("キーボードを表示")).toBeInTheDocument();
    });
  });

  test("キーボードを表示ボタンをクリックするとモーダルが開く", async () => {
    APIserver.use(setupEditProfileMock());
    render(await Edit());
    const user = userEvent.setup();
    const keyboardButton = screen.getByText("キーボードを表示");
    await user.click(keyboardButton);

    await waitFor(() => {
      expect(screen.getByText("音階を選択してください")).toBeInTheDocument();
    }); 
  });

  test("キーボードをクリックすると音が鳴る", async () => {
    const mockHandleKeyPress = vi.fn();
    vi.spyOn(useKeyboardModule, 'useKeyboard').mockReturnValue({
      isModalOpen: true,
      openModal: vi.fn(),
      closeModal: vi.fn(),
      handleKeyPress: mockHandleKeyPress,
      handleKeyRelease: vi.fn(),
    });
  
    APIserver.use(setupEditProfileMock());
    render(await Edit());
    const user = userEvent.setup();
    const keyboardButton = screen.getByText("キーボードを表示");
    await user.click(keyboardButton);
  
    await waitFor(() => {
      expect(screen.getByText("音階を選択してください")).toBeInTheDocument();
    });
  
    const keyboardKey = screen.getByTestId("key-ド3");
    await user.click(keyboardKey);
  
    expect(mockHandleKeyPress).toHaveBeenCalledWith(expect.any(Number));
  });
});