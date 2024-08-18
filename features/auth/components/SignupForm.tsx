"use client"

import React from 'react'
import { useSignupForm } from '@/features/auth/hooks/useSignupForm';
import { Input } from '@/components/ui/input';
import { LoadingButton } from '@/app/components/elements/LoadingButton';

const SignupForm = () => {
  const { form, onSubmit, serverError, isLoading } = useSignupForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;


  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-white text-center mt-8 text-3xl font-medium">新規登録</h2>
        <div className="text-white">
          <label htmlFor="name" className="mb-1 block text-lg">ユーザー名</label>
          <Input
            type="text"
            id="name"
            placeholder="xxx"
            className="text-black"
            {...register('name')}
          />
          {errors.name && <p>※{errors.name.message}</p>}
        </div>
        <div className="text-white mt-2">
          <label htmlFor="email" className="mb-1 block text-lg">メールアドレス</label>
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
          <label htmlFor="password" className="mb-1 block text-lg">パスワード</label>
          <Input
            type="password"
            id="password"
            placeholder="password"
            className="text-black"
            {...register('password')}
          />
          {errors.password && <p>※{errors.password.message}</p>}
        </div>
        <div className="text-white mt-2">
          <label htmlFor="password_confirmation" className="mb-1 block text-lg">パスワード確認</label>
          <Input
            type="password"
            id="password_confirmation"
            placeholder="password"
            className="text-black"
            {...register('password_confirmation')}
          />
          {errors.password_confirmation && <p>※{errors.password_confirmation.message}</p>}
        </div>
        {serverError && <p className="text-white mt-2">※{serverError}</p>}
        <div className="my-4 flex justify-center">
          <LoadingButton
            type="submit"
            variant="outline"
            className="w-20 h-10 text-lg flex items-center justify-center transition-all hover:scale-105"
            isLoading={isLoading}
          >
            新規登録
          </LoadingButton>
        </div>
      </form>
    </div>
  )
};

export default SignupForm;