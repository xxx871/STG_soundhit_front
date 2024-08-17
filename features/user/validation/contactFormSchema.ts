import { z } from "zod";

export const contactFormSchema= z.object({
  email: z
    .string()
    .email("適切なメールアドレスを入力してください。"),
  message: z
    .string()
    .min(1, "メッセージを入力してください。")
    .max(1000, "メッセージは1000文字以内で入力してください。")
});