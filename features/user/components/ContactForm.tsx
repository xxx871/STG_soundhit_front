"use client"

import React from 'react'
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useContactForm } from '@/features/user/hooks/useContactForm';
import { LoadingButton } from '@/app/components/elements/LoadingButton';

const ContactForm = () => {
  const { form, onSubmit, isLoading, error } = useContactForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;


  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-white text-center mt-8 text-3xl font-medium">お問い合わせ</h2>
      <div className="text-white mt-4">
        <label htmlFor="email" className="mb-1 block text-xl">メールアドレス</label>
        <Input
          type="email"
          id="email"
          placeholder="aaa@example.com"
          className="text-black"
          {...register('email')}
        />
        {errors.email && <p>※{errors.email.message}</p>}
      </div>
      <div className="text-white mt-4">
        <label htmlFor="message" className="mb-1 block text-xl">メッセージ</label>
        <Textarea
          id="message"
          placeholder="text"
          className="text-black"
          {...register('message')}
        />
        {errors.message && <p>※{errors.message.message}</p>}
      </div>
      {error && <p className="text-white">{error}</p>}
      <div className="mt-8 flex justify-center">
        <LoadingButton
          type="submit"
          variant="outline"
          className="w-20 h-10 text-xl flex items-center justify-center transition-all hover:scale-105"
          isLoading={isLoading}
        >
          送信
        </LoadingButton>
      </div>
      </form>
    </div>
  )
};

export default ContactForm;