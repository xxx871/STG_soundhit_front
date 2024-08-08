"use client"

import { Input } from '@/components/ui/input'
import React from 'react'
import { usePasswordChangeForm } from '../hooks/usePasswordChangeForm'
import { LoadingButton } from '@/app/components/elements/LoadingButton'

const PasswordChangeForm = () => {
  const { form, onSubmit, serverError, isLoading } = usePasswordChangeForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-white text-center mt-8 text-3xl font-medium">パスワード新規登録</h2>
        <div className="text-white">
          <label htmlFor="password" className="mb-1 block text-xl">パスワード</label>
          <Input
            type="password"
            id="password"
            placeholder="password"
            className="text-black"
            {...register('password')}
          />
          {errors.password &&<p>※{errors.password.message}</p>}
        </div>
        <div className="text-white mt-4">
          <label htmlFor="password_confirmation" className="mb-1 block text-xl">パスワード確認</label>
          <Input
            type="password"
            id="password_confirmation"
            placeholder="password"
            className="text-black"
            {...register('password_confirmation')}
          />
          {errors.password_confirmation &&<p>※{errors.password_confirmation.message}</p>}
        </div>
        {serverError && <p className="text-white mt-4">{serverError}</p>}
        <div className="mt-6 mb-2 flex justify-center">
          <LoadingButton
            type="submit"
            variant="outline"
            className="w-20 h-10 text-lg flex items-center justify-center transition-all hover:scale-105"
            isLoading={isLoading}
          >
            送信
          </LoadingButton>
        </div>
      </form>
    </div>
  )
}

export default PasswordChangeForm