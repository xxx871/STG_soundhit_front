import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { passwordResetFormSchema } from "@/features/auth/validation/passwordResetFormSchema";
import { z } from "zod";
import { passwordReset } from "@/features/auth/api/passwordReset";

export const usePasswordResetForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(passwordResetFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof passwordResetFormSchema>) => {
    setIsLoading(true);
    setServerError(null);
    setIsSuccess(false);
    const { email } = value;
    try {
      const response = await passwordReset({
        email
      });

      if (response.error) {
        console.log(response.error.message);
        throw response.error;
      }
      setIsSuccess(true);
    } catch (error) {
      setServerError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return { form, onSubmit, serverError, isLoading, isSuccess };
}