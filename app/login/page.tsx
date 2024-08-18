import ExternalAuthButton from '@/features/auth/components/ExternalAuthButton';
import LoginForm from '@/features/auth/components/LoginForm';
import Link from 'next/link';
import React from 'react';

const Login = () => {
  return (
    <div className="max-w-sm mx-auto grig gap-6">
      <LoginForm />
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"/>
        </div>
        <div className="relative flex justify-center text-xm text-white">
        <span className="px-2 my-2 backdrop-blur-sm">
            または
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3 text-black">
        <ExternalAuthButton provider="github" label="Github"/>
        <ExternalAuthButton provider="google" label="Google" />
      </div>
      <div className="text-center mt-2">
        <Link href="/signup" className="text-white hover:underline text-xl">
          初めてご利用の方はこちら
        </Link>
      </div>
      <div className="text-center mt-2">
        <Link href="/password" className="text-white hover:underline text-xl">
          パスワードをお忘れの方はこちら
        </Link>
      </div>
    </div>
  );
};

export default Login;