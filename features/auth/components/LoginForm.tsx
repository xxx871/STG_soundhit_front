"use client"

import React from 'react'
import { useLoginForm } from '@/features/auth/hooks/useLoginForm';
import { Input } from '@/components/ui/input';
import { LoadingButton } from '@/app/components/elements/LoadingButton';

const LoginForm = () => {
  const { form, onSubmit, serverError, isLoading } = useLoginForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-white text-center mt-8 text-3xl font-medium">ログイン</h2>
        <div className="text-white">
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
        <div className="text-white mt-2">
          <label htmlFor="password" className="mb-1 block text-xl">パスワード</label>
          <Input
            type="password"
            id="password"
            placeholder="password"
            {...register('password')}
            className="text-black"
          />
          {errors.password && <p>※{errors.password.message}</p>}
        </div>
        {serverError && <p className="text-white mt-2">{serverError}</p>}
        <div className="mt-2 flex justify-center">
          <LoadingButton
            type="submit"
            variant="outline"
            className="w-20 h-10 text-lg flex items-center justify-center transition-all hover:scale-105"
            isLoading={isLoading}
          >
            ログイン
          </LoadingButton>
        </div>
      </form>
    </div>
  )
};

export default LoginForm;