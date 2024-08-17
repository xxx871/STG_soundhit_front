import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { loginFormSchema } from "@/features/auth/validation/loginFormSchema";
import { z } from "zod";
import { login } from "@/features/auth/api/login";
import { useState } from "react";

export const useLoginForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof loginFormSchema>) => {
    setIsLoading(true);
    const { email, password } = value;
    try {
      const response = await login({
        email,
        password
      });

      if (response.error) {
        setServerError("ログインに失敗しました。");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      setServerError("ログインに失敗しました。");
    } finally {
      setIsLoading(false);
    }
  };

  return { form, onSubmit, serverError, isLoading };
};