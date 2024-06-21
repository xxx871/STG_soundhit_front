import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { contactFormSchema } from "../validation/contactFormSchema";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useContactForm = () => {
  const router = useRouter();

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof contactFormSchema>) => {
    const { email, message } = value;
    const response = await axios.post("/api/contact", {
      email,
      message,
    });
    if (response.status === 200) {
      router.push("/thanks");
    } else {
      alert("正常に送信できませんでした");
    };
  }

  return { form, onSubmit };
};