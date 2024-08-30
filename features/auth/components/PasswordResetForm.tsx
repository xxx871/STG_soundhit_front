"use client"

import React from 'react'
import { Input } from '@/components/ui/input';
import { usePasswordResetForm } from '@/features/auth/hooks/usePasswordResetForm';
import { LoadingButton } from '@/app/components/elements/LoadingButton';

const PasswordResetForm = () => {
  const { form, onSubmit, serverError, isLoading, isSuccess } = usePasswordResetForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  if (isSuccess) {
    return (
      <div className="text-white text-center mt-8">
        <h2 className="text-2xl font-medium">パスワードリセット申請が完了しました。</h2>
        <p className="text-xl mt-4">メールをご確認ください。</p>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-white text-center mt-8 text-3xl font-medium">パスワードリセット申請</h2>
        <div className="text-white mt-4">
          <label htmlFor="email" className="mb-1 block text-xl">メールアドレス</label>
          <Input
            type="email"
            id="email"
            placeholder="aaa@example.com"
            className="text-black"
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
};

export default PasswordResetForm;