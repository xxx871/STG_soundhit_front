'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import LogoutButton from '@/features/auth/components/LogoutButton';
import { getUserSession } from '@/lib/session';

const AuthButtons = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const userSession = await getUserSession();
        setIsLoggedIn(userSession ? userSession.is_login : false);
      } catch (error) {
        console.error('Failed to get user session:', error);
        setIsLoggedIn(false);
      }
    };

    checkUserSession();
  }, []);

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? (
    <>
      <Link href="/profile" className="transition-colors hover:text-gray-300 mr-6">プロフィール</Link>
      <LogoutButton type="button">
        ログアウト
      </LogoutButton>
    </>
  ) : (
    <Link href="/login" className="bg-black text-white py-1 px-3 rounded-md font-medium text-xl transition-colors hover:bg-white hover:text-black">
      ログイン
    </Link>
  );
};

export default AuthButtons;