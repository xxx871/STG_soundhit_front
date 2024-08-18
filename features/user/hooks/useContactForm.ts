import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { contactFormSchema } from "@/features/user/validation/contactFormSchema";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useContactForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof contactFormSchema>) => {
    setIsLoading(true);
    setError(null);
    const { email, message } = value;
    try {
      await axios.post("/api/contact", {
        email,
        message,
      });
      router.push("/thanks");
    } catch (error) {
      console.error("Error submitting form:", error);
      setError('正常に送信できませんでした');
    } finally {
      setIsLoading(false);
    }
  };

  return { form, onSubmit, isLoading, error };
};