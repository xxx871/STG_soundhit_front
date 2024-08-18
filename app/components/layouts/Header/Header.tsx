import LogoutButton from '@/features/auth/components/LogoutButton';
import { getUserSession } from '@/lib/session';
import Link from 'next/link'
import React from 'react'
import Image from 'next/image';
import ModalTutorial from '@/features/tutorial/components/ModalTutorial';
import { getModes } from '@/lib/api/getModes';

const Header = async () => {
  const userSession = await getUserSession();
  const isLoggedIn = userSession ? userSession.is_login : false;
  const modes = await getModes();

  return (
    <header className="divide-y border-gray-200 dark:border-gray-800 border-b bg-inherit h-12 flex items-center">
      <div className="px-4 md:py-2 lg:px-6 w-full">
        <div className="flex items-center justify-between space-y-2 md:space-y-0 md:space-x-6 text-white">
          <Link href="/" className="text-2xl font-bold font-palettemosaic flex items-center">
            <Image
              src="/header_icon.png"
              alt="Header Icon"
              height={50}
              width={50}
            />
            おんぴしゃ
          </Link>
          <nav className="flex justify-end items-center text-2xl font-medium text-white">
            <ModalTutorial modes={modes}/>
            <Link href="/ranking" className="transition-colors hover:text-gray-300 mx-6">
              ランキング
            </Link>
            {isLoggedIn ? (
              <>
                <Link href="/profile" className="transition-colors hover:text-gray-300 mr-6">プロフィール</Link>
                <LogoutButton
                  type="button"
                >
                  ログアウト
                </LogoutButton>
              </>
            ) : (
              <Link href="/login" className="bg-black text-white py-1 px-3 rounded-md font-medium text-xl transition-colors hover:bg-white hover:text-black">
                ログイン
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
};

export default Header;