import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { contactFormSchema } from "../validation/contactFormSchema";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useContactForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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
    const { email, message } = value;
    try {
      const response = await axios.post("/api/contact", {
        email,
        message,
      });
      if (response.status === 200) {
        router.push("/thanks");
      } else {
        alert("正常に送信できませんでした");
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { form, onSubmit, isLoading };
};