"use client"

import React from 'react'
import { usePasswordResetForm } from '../hooks/usePasswordResetForm';
import { Input } from '@/components/ui/input';
import { LoadingButton } from '@/app/components/elements/LoadingButton';

const PasswordResetForm = () => {
  const { form, onSubmit, serverError, isLoading } = usePasswordResetForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-center mb-5 text-3xl font-medium text-white">パスワードリセット申請</h2>
        <div className="text-white">
          <label htmlFor="email" className="mb-1 block text-2xl">メールアドレス</label>
          <Input
            type="email"
            id="email"
            placeholder="aaa@example.com"
            className="w-full h-12 text-lg px-4"
            {...register('email')}
          />
          {errors.email &&<p>※{errors.email.message}</p>}
        </div>
        {serverError && <p className="text-white mt-4">{serverError}</p>}
        <div className="mt-6 flex justify-center">
          <LoadingButton
            type="submit"
            variant="outline"
            className="w-30 h-10 text-lg flex items-center justify-center transition-all hover:scale-105"
            isLoading={isLoading}
          >
            フォーム送信
          </LoadingButton>
        </div>
      </form>
    </div>
  )
}

export default PasswordResetForm