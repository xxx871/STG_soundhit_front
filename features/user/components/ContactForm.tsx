"use client"

import React from 'react'
import { useContactForm } from '../hooks/useContactForm';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { LoadingButton } from '@/app/components/elements/LoadingButton';

const ContactForm = () => {
  const { form, onSubmit, isLoading } = useContactForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;


  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-center mb-5 text-3xl text-white font-medium">お問い合わせ</h2>
      <div className="text-white">
        <label htmlFor="email" className="mb-1 block text-2xl">メールアドレス</label>
        <Input
          type="email"
          id="email"
          placeholder="aaa@example.com"
          {...register('email')}
        />
        {errors.email && <p>※{errors.email.message}</p>}
      </div>
      <div className="text-white mt-4">
        <label htmlFor="message" className="mb-1 block text-2xl">メッセージ</label>
        <Textarea
          id="message"
          placeholder="text"
          {...register('message')}
        />
        {errors.message && <p>※{errors.message.message}</p>}
      </div>
      <div className="mt-4">
        <LoadingButton
          type="submit"
          variant="outline"
          className="w-32 h-12 text-lg text-white"
          isLoading={isLoading}
        >
          送信
        </LoadingButton>
      </div>
      </form>
    </div>
  )
}

export default ContactForm