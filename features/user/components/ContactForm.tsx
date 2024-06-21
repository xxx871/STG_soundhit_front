"use client"

import React from 'react'
import { useContactForm } from '../hooks/useContactForm';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const ContactForm = () => {
  const { form, onSubmit } = useContactForm();
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
        <Button type="submit">メール送信</Button>
      </div>
      </form>
    </div>
  )
}

export default ContactForm